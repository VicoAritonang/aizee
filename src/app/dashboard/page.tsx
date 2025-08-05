'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import QRCode from 'react-qr-code'

// Initialize Supabase client conditionally
let supabase: any = null

const initializeSupabase = async () => {
  if (typeof window !== 'undefined' && !supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import('@supabase/supabase-js')
      supabase = createClient(supabaseUrl, supabaseAnonKey)
    }
  }
  return supabase
}

interface User {
  id: string
  email?: string
}

interface Profile {
  id: string
  name: string
  email: string
  subscription_status: string
  subscription_start_date?: string
  subscription_end_date?: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      const client = await initializeSupabase()
      if (!client) return

      // Set up auth state listener
      const { data: { subscription } } = client.auth.onAuthStateChange(
        async (event: string, session: any) => {
          console.log('Auth state changed:', event, session?.user?.id)
          
          if (event === 'SIGNED_IN' && session?.user) {
            setUser(session.user)
            await createProfileIfNeeded(session.user)
            setLoading(false)
          } else if (event === 'SIGNED_OUT') {
            setUser(null)
            setProfile(null)
            setLoading(false)
            router.push('/auth/login')
          }
        }
      )

      // Check current session (OAuth code already handled in callback)
      const { data: { user } } = await client.auth.getUser()
      if (user) {
        setUser(user)
        await createProfileIfNeeded(user)
        setLoading(false)
      } else {
        setLoading(false)
        router.push('/auth/login')
      }

      // Cleanup subscription on unmount
      return () => subscription.unsubscribe()
    }

    initializeAuth()
  }, [])

  const createProfileIfNeeded = async (user: any) => {
    try {
      const client = await initializeSupabase()
      if (!client) return

      console.log('Checking if profile exists for user:', user.id)

      // Check if profile exists
      const { data: existingProfile, error: profileError } = await client
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        console.log('Creating new profile for OAuth user:', user.id)
        console.log('User metadata:', user.user_metadata)
        
        // Get name from OAuth metadata or user data
        let userName = 'User'
        if (user.user_metadata?.full_name) {
          userName = user.user_metadata.full_name
        } else if (user.user_metadata?.name) {
          userName = user.user_metadata.name
        } else if (user.email) {
          userName = user.email.split('@')[0]
        }

        console.log('Creating profile with name:', userName)

        const { data: newProfile, error: createError } = await client
          .from('profiles')
          .insert([
            {
              id: user.id,
              name: userName,
              email: user.email || '',
            }
          ])
          .select()
          .single()

        if (createError) {
          console.error('Error creating profile:', createError)
          console.error('Profile creation details:', {
            id: user.id,
            name: userName,
            email: user.email
          })
        } else {
          console.log('Profile created successfully:', newProfile)
          setProfile(newProfile)
        }
      } else if (profileError) {
        console.error('Error checking profile:', profileError)
      } else {
        console.log('Profile already exists:', existingProfile)
        setProfile(existingProfile)
      }
    } catch (error) {
      console.error('Error in createProfileIfNeeded:', error)
    }
  }



  const handlePayment = async () => {
    setUpdating(true)
    try {
      const client = await initializeSupabase()
      if (!client) {
        throw new Error('Database not configured')
      }

      // Calculate subscription dates
      const startDate = new Date()
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 30) // 30 days from now

      const { error } = await client
        .from('profiles')
        .update({ 
          subscription_status: 'active',
          subscription_start_date: startDate.toISOString(),
          subscription_end_date: endDate.toISOString()
        })
        .eq('id', user?.id)

      if (error) throw error

      // Refresh profile data
      const { data: profileData } = await client
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      setProfile(profileData)
    } catch (error) {
      console.error('Error updating subscription:', error)
    } finally {
      setUpdating(false)
    }
  }

  const handleSignOut = async () => {
    try {
      const client = await initializeSupabase()
      if (client) {
        await client.auth.signOut()
      }
    } catch (error) {
      console.error('Error signing out:', error)
    }
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                      <div className="flex items-center space-x-3">
          <img 
            src="https://i.imgur.com/DtxyEY6.png" 
            alt="Aizee Logo" 
            className="w-10 h-10"
          />
          <span className="text-2xl font-bold text-white leading-none">Aizee Dashboard</span>
        </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-white/80">Selamat datang, {profile?.name || user?.email}</span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Subscription Status */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Status Langganan</h2>
              
              <div className="mb-8">
                <div className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${
                  profile?.subscription_status === 'active' 
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    profile?.subscription_status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                  }`}></div>
                  {profile?.subscription_status === 'active' ? 'Langganan Aktif' : 'Belum Aktif'}
                </div>
              </div>

              {profile?.subscription_status !== 'active' && (
                <>
                  {/* Pricing Information */}
                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">Rp 330.000</div>
                      <div className="text-cyan-300 text-sm mb-4">Per Bulan</div>
                      <div className="text-gray-300 text-sm space-y-1">
                        <div>✅ Akses penuh ke semua fitur Aizee</div>
                        <div>✅ Dukungan 24/7</div>
                        <div>✅ Update otomatis</div>
                        <div>✅ Integrasi dengan 1000+ perangkat</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={updating}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {updating ? 'Memproses Pembayaran...' : 'Bayar Sekarang'}
                  </button>
                </>
              )}

              {profile?.subscription_status === 'active' && (
                <div className="space-y-4">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-300 text-sm mb-2">
                      ✅ Langganan Anda aktif! Anda dapat menggunakan semua fitur Aizee.
                    </p>
                    {profile.subscription_start_date && profile.subscription_end_date && (
                      <div className="text-green-200 text-xs">
                        <div>Mulai: {new Date(profile.subscription_start_date).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}</div>
                        <div>Berakhir: {new Date(profile.subscription_end_date).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-blue-300 text-sm">
                                             💡 Layanan aktif hingga {profile.subscription_end_date ? 
                         new Date(profile.subscription_end_date).toLocaleDateString("id-ID", { 
                           day: "numeric", 
                           month: "long", 
                           year: "numeric" 
                         }) : "30 hari ke depan"
                       }
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* QR Code */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">QR Code Setup</h2>
              
              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                  <QRCode 
                    value="https://aizee.id/setup" 
                    size={200}
                    level="H"
                  />
                </div>
              </div>
              
              <p className="text-gray-300 text-center text-sm mb-8">
                QR Code ini untuk keperluan demo
              </p>

              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Cara Setup:</h3>
                <ol className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span>Buka aplikasi Tuya Smart di smartphone Anda</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Pilih "Add Device" atau "Tambah Perangkat"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>Scan QR Code di atas dengan aplikasi Tuya</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Ikuti instruksi di aplikasi untuk menyelesaikan setup</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Usage Guide */}
          <div className="mt-12 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Cara Menggunakan Aizee</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Kontrol via Mobile</h3>
                <p className="text-gray-300 text-sm">
                  Gunakan aplikasi Aizee untuk mengontrol semua perangkat smart home Anda dari mana saja.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Otomatisasi Cerdas</h3>
                <p className="text-gray-300 text-sm">
                  AI akan belajar dari kebiasaan Anda dan mengatur otomatisasi yang sesuai.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Bantuan 24/7</h3>
                <p className="text-gray-300 text-sm">
                  Tim support kami siap membantu Anda kapan saja jika mengalami kendala.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 