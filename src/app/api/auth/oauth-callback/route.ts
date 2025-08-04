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

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: 'Missing auth code' }, { status: 400 })
    }

    // Exchange code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.json({ error: 'Failed to exchange code for session' }, { status: 500 })
    }

    if (!data.user) {
      return NextResponse.json({ error: 'No user data received' }, { status: 400 })
    }

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

      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            name: userName,
            email: data.user.email || '',
          }
        ])
        .select()
        .single()

      if (createError) {
        console.error('Error creating profile:', createError)
        return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
      }

      console.log('Profile created successfully:', newProfile)
      return NextResponse.json({ 
        success: true, 
        user: data.user, 
        profile: newProfile,
        session: data.session 
      })
    } else if (profileError) {
      console.error('Error checking profile:', profileError)
      return NextResponse.json({ error: 'Failed to check profile' }, { status: 500 })
    } else {
      // Profile exists
      console.log('Profile already exists:', existingProfile)
      return NextResponse.json({ 
        success: true, 
        user: data.user, 
        profile: existingProfile,
        session: data.session 
      })
    }
  } catch (error) {
    console.error('Error in OAuth callback API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 