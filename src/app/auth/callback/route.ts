import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    // Simply redirect to dashboard with the auth code
    return NextResponse.redirect(new URL(`/dashboard?code=${code}`, request.url))
  }

  // If no code, redirect to login
  return NextResponse.redirect(new URL('/auth/login', request.url))
} 