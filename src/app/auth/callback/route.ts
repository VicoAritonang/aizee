import { NextRequest, NextResponse } from 'next/server'

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only import supabase if environment variables are available
let supabase: any = null
if (supabaseUrl && supabaseAnonKey) {
  const { createClient } = await import('@supabase/supabase-js')
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  console.log('Auth callback received:', { code: !!code, error })

  if (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(new URL('/auth/login?error=oauth_error', request.url))
  }

  if (code) {
    try {
      if (!supabase) {
        console.error('Supabase not configured')
        return NextResponse.redirect(new URL('/auth/login?error=config_error', request.url))
      }

      // Exchange code for session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError)
        return NextResponse.redirect(new URL('/auth/login?error=session_error', request.url))
      }

      if (!data.user) {
        console.error('No user data received')
        return NextResponse.redirect(new URL('/auth/login?error=no_user', request.url))
      }

      console.log('OAuth session established successfully for user:', data.user.id)

      // Check if profile exists
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        console.log('Creating profile for OAuth user:', data.user.id)
        
        // Get name from OAuth metadata
        let userName = 'User'
        if (data.user.user_metadata?.full_name) {
          userName = data.user.user_metadata.full_name
        } else if (data.user.user_metadata?.name) {
          userName = data.user.user_metadata.name
        } else if (data.user.email) {
          userName = data.user.email.split('@')[0]
        }

        const { error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              name: userName,
              email: data.user.email || '',
            }
          ])

        if (createError) {
          console.error('Error creating profile:', createError)
        } else {
          console.log('Profile created successfully for user:', data.user.id)
        }
      } else if (profileError) {
        console.error('Error checking profile:', profileError)
      } else {
        console.log('Profile already exists for user:', data.user.id)
      }

      // Redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch (error) {
      console.error('Error in auth callback:', error)
      return NextResponse.redirect(new URL('/auth/login?error=callback_error', request.url))
    }
  }

  // If no code, redirect to login
  return NextResponse.redirect(new URL('/auth/login', request.url))
} 