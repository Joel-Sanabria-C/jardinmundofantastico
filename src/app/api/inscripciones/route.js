import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const supabase = createClient()
    const { data, error } = await supabase.from('inscripciones').insert([body]).select().single()
    if (error) throw error
    return NextResponse.json({ success:true, data }, { status:201 })
  } catch (error) {
    return NextResponse.json({ success:false, error:error.message }, { status:500 })
  }
}

export async function GET() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('inscripciones').select('*').order('created_at', { ascending:false })
    if (error) throw error
    return NextResponse.json({ success:true, data })
  } catch (error) {
    return NextResponse.json({ success:false, error:error.message }, { status:500 })
  }
}
