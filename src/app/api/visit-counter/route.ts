import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
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