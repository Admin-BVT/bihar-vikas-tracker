import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAdmin } from "@/lib/isAdmin";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // ✅ 1. Basic validation
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    // ✅ 2. Strict UUID validation (very important)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: "Invalid project ID format" },
        { status: 400 }
      );
    }

    const supabase = supabaseAdmin();

    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        name,
        district,
        category,
        status,
        budget,
        progress,
        beneficiaries,
        implementing_agency,
        start_date,
        expected_end_date,
        actual_completion_date,
        notes,
        image_url,
        video_url
      `) // ✅ removed "*"
      .eq("id", id)
      .maybeSingle(); // ✅ safer than .single()

    if (error || !data) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}