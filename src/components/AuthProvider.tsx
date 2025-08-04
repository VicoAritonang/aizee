'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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

interface AuthContextType {
  user: any
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const client = await initializeSupabase()
        if (!client) {
          console.error('Database not configured')
          setLoading(false)
          return
        }

        // Handle OAuth callback tokens from URL parameters
        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search)
          const accessToken = urlParams.get('access_token')
          const refreshToken = urlParams.get('refresh_token')
          
          if (accessToken && refreshToken) {
            try {
              // Set the session with the tokens
              const { data, error } = await client.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              })
              
              if (error) {
                console.error('Error setting session:', error)
              } else {
                // Clear URL parameters after setting session
                window.history.replaceState({}, document.title, window.location.pathname)
              }
            } catch (error) {
              console.error('Error handling OAuth callback:', error)
            }
          }
        }

        // Get initial session
        const { data: { session } } = await client.auth.getSession()
        setUser(session?.user ?? null)

        // Listen for auth changes
        const { data: { subscription } } = client.auth.onAuthStateChange(
          async (event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
          }
        )

        setLoading(false)

        return () => subscription.unsubscribe()
      } catch (error) {
        console.error('Error initializing auth:', error)
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signOut = async () => {
    try {
      const client = await initializeSupabase()
      if (client) {
        await client.auth.signOut()
        router.push('/')
      }
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const value = {
    user,
    loading,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 