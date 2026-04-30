import { NextResponse } from 'next/server'
import { supabaseAdmin } from "@/lib/supabase";
import { isAdmin } from "@/lib/isAdmin";
import { BLOCKS_BY_DISTRICT } from "@/data/blocks";

export async function POST(req: Request) {
  try {
    if (!(await isAdmin())) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const {
      name,
      district,
      block,
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
    } = body;

    
    const normalizedDistrict = district?.toLowerCase().trim();
const normalizedBlock = block?.trim();

// 1. Empty check FIRST
if (!normalizedDistrict || !normalizedBlock) {
  return NextResponse.json(
    { error: "District and block are required" },
    { status: 400 }
  );
}

// 2. District validation
const validBlocks = BLOCKS_BY_DISTRICT[normalizedDistrict];

if (!validBlocks) {
  return NextResponse.json(
    { error: "Invalid district" },
    { status: 400 }
  );
}

// 3. Block validation
if (!validBlocks.includes(normalizedBlock)) {
  return NextResponse.json(
    { error: "Invalid block for selected district" },
    { status: 400 }
  );
}

    const supabase = supabaseAdmin();

    const { error } = await supabase.from("projects").insert([
      {
        name,
        district: normalizedDistrict,
        block: normalizedBlock,
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
    ]);

    if (error) {
  console.error('Supabase insert error:', error);
  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  );
}
return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("API crash:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const district = searchParams.get("district");
    const block = searchParams.get("block");
    const category = searchParams.get("category");

    const supabase = supabaseAdmin();

    let query = supabase.from("projects").select("*");

    if (district) {
      query = query.eq("district", district.toLowerCase());
    }

    if (block) {
  query = query.eq("block", block.trim());
}

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}