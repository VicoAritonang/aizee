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

export async function POST() {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    // Increment visitor counter
    const { data, error } = await supabase.rpc('increment_visitors')
    
    if (error) {
      console.error('Error incrementing visitors:', error)
      return NextResponse.json({ error: 'Failed to increment visitors' }, { status: 500 })
    }

    return NextResponse.json({ success: true, visitors: data })
  } catch (error) {
    console.error('Error in visit counter API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ 
        visitors: 0,
        registeredUsers: 0,
        subscribedUsers: 0
      })
    }

    // First, update the counts to ensure they're current
    await supabase.rpc('update_registered_users_count')
    await supabase.rpc('update_subscribed_users_count')
    
    // Then get all stats
    const { data, error } = await supabase
      .from('site_stats')
      .select('total_visitors, total_registered_users, total_subscribed_users')
      .eq('id', 1)
      .single()

    if (error) {
      console.error('Error fetching stats:', error)
      return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }

    return NextResponse.json({
      visitors: data?.total_visitors || 0,
      registeredUsers: data?.total_registered_users || 0,
      subscribedUsers: data?.total_subscribed_users || 0
    })
  } catch (error) {
    console.error('Error in stats API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 