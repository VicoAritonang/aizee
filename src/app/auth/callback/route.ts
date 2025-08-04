import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    try {
      // Call our OAuth callback API to handle profile creation
      const response = await fetch(`${request.nextUrl.origin}/api/auth/oauth-callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      if (response.ok) {
        // Successfully handled OAuth, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url))
      } else {
        console.error('OAuth callback API failed:', await response.text())
        // If API fails, still redirect to dashboard (it will handle the code)
        return NextResponse.redirect(new URL(`/dashboard?code=${code}`, request.url))
      }
    } catch (error) {
      console.error('Error in auth callback:', error)
      // Fallback: redirect to dashboard with code
      return NextResponse.redirect(new URL(`/dashboard?code=${code}`, request.url))
    }
  }

  // If no code, redirect to login
  return NextResponse.redirect(new URL('/auth/login', request.url))
} 