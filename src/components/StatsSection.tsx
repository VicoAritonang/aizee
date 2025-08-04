'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  visitors: number
  registeredUsers: number
  subscribedUsers: number
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stats>({
    visitors: 0,
    registeredUsers: 0,
    subscribedUsers: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Increment visitor counter when component mounts
    const incrementVisitor = async () => {
      try {
        await fetch('/api/visit-counter', { method: 'POST' })
      } catch (error) {
        console.error('Error incrementing visitor:', error)
      }
    }

    // Fetch stats from database
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/visit-counter')
        if (response.ok) {
          const data = await response.json()
          setStats({
            visitors: data.visitors || 0,
            registeredUsers: data.registeredUsers || 0,
            subscribedUsers: data.subscribedUsers || 0
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    incrementVisitor()
    fetchStats()
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Aizee dalam Angka
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Lihat bagaimana Aizee telah mengubah ribuan rumah menjadi ekosistem yang cerdas, personal, dan manusiawi.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="text-center group">
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              {loading ? (
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                stats.visitors.toLocaleString()
              )}
            </div>
            <div className="text-xl text-gray-700 font-semibold mb-2">Pengunjung Website</div>
            <div className="text-gray-500">Total kunjungan</div>
          </div>
          
          <div className="text-center group">
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              {loading ? (
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                stats.registeredUsers.toLocaleString()
              )}
            </div>
            <div className="text-xl text-gray-700 font-semibold mb-2">Pengguna Terdaftar</div>
            <div className="text-gray-500">Total registrasi</div>
          </div>
          
          <div className="text-center group">
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              {loading ? (
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                stats.subscribedUsers.toLocaleString()
              )}
            </div>
            <div className="text-xl text-gray-700 font-semibold mb-2">Pengguna Berlangganan</div>
            <div className="text-gray-500">Langganan aktif</div>
          </div>
        </div>

        {/* Why Choose Aizee Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-cyan-50 rounded-3xl p-12 lg:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full translate-y-24 -translate-x-24"></div>
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Mengapa Memilih Aizee?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">AI yang Adaptif & Kontekstual</h4>
                    <p className="text-gray-600 leading-relaxed">Memahami perilaku dan kebutuhan pengguna secara alami, mampu beradaptasi dengan situasi yang berbeda.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Ekosistem Terintegrasi</h4>
                    <p className="text-gray-600 leading-relaxed">Menghubungkan rumah dengan layanan digital eksternal untuk kehidupan modern yang efisien.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Pendekatan Etis</h4>
                    <p className="text-gray-600 leading-relaxed">Menerapkan desain dan pengembangan teknologi yang menjaga privasi dan keamanan pengguna.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Mulai Berlangganan Aizee
                </h4>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Dapatkan akses ke semua fitur dan layanan Aizee seharga Rp 330.000.
                </p>
                <Link 
                  href="/auth/register"
                  className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                >
                  Mulai Berlangganan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 