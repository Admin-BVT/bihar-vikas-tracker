import { NextResponse } from 'next/server'
import { supabaseAdmin } from "@/lib/supabase";
import { isAdmin } from "@/lib/isAdmin";

export async function POST(req: Request) {
  try {
    
if (!(await isAdmin())) {
  return new Response("Unauthorized", { status: 401 });
}

    const body = await req.json()

    const {
      name,
      district,
      category,
      status,
      budget,
      progress,
      start_date,
      expected_end_date,
      actual_completion_date,
      beneficiaries,
      implementing_agency,
      notes,
      image_url,
      video_url,
    } = body

    if (
  typeof name !== "string" ||
  typeof district !== "string" ||
  typeof category !== "string" ||
  typeof status !== "string"
) {
  return NextResponse.json({ error: "Invalid input" }, { status: 400 })
}


    const supabase = supabaseAdmin()

    const { error } = await supabase.from('projects').insert([
      {
        name,
        district,
        category,
        status,
        budget,
        progress,
        start_date,
        expected_end_date,
        actual_completion_date,
        beneficiaries,
        implementing_agency,
        notes,
        image_url,
        video_url,
      },
    ])

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('API crash:', err)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
