'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import StatsSection from '@/components/StatsSection'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Handle OAuth callback with hash fragments
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1) // Remove the # symbol
      const params = new URLSearchParams(hash)
      
      // Check if this is an OAuth callback with access_token
      if (params.has('access_token')) {
        // Redirect to dashboard with the tokens
        const redirectUrl = new URL('/dashboard', window.location.origin)
        redirectUrl.searchParams.set('access_token', params.get('access_token') || '')
        redirectUrl.searchParams.set('refresh_token', params.get('refresh_token') || '')
        redirectUrl.searchParams.set('expires_in', params.get('expires_in') || '')
        redirectUrl.searchParams.set('token_type', params.get('token_type') || '')
        
        router.push(redirectUrl.toString())
        return
      }
    }

    // If user is already logged in, redirect to dashboard
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Memuat...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
