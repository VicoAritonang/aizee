import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
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