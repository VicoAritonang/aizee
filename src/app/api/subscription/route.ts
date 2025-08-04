import { NextResponse } from 'next/server'

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only import supabase if environment variables are available
let supabase: any = null
if (supabaseUrl && supabaseAnonKey) {
  const { createClient } = await import('@supabase/supabase-js')
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export async function POST(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { userId, status } = await request.json()

    if (!userId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Update subscription status di Supabase
    const { data, error } = await supabase
      .from('profiles')
      .update({ subscription_status: status })
      .eq('id', userId)
      .select()

    if (error) {
      console.error('Error updating subscription:', error)
      return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in subscription API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 })
    }

    if (!supabase) {
      return NextResponse.json({ subscription_status: 'inactive' })
    }

    // Get subscription status dari Supabase
    const { data, error } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error getting subscription status:', error)
      return NextResponse.json({ subscription_status: 'inactive' })
    }

    return NextResponse.json({ subscription_status: data?.subscription_status || 'inactive' })
  } catch (error) {
    console.error('Error in subscription GET API:', error)
    return NextResponse.json({ subscription_status: 'inactive' })
  }
} 