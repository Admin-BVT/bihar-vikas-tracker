import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  _req: Request,
  context: { params: Promise<{ district: string }> }
) {
  try {
    const { district } = await context.params;

    if (!district) {
      return NextResponse.json(
        { error: "District is required" },
        { status: 400 }
      );
    }

    const decodedDistrict = decodeURIComponent(district);
    const supabase = supabaseAdmin();

    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("district", decodedDistrict);

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch district data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ district: decodedDistrict, projects });
  } catch (err) {
    console.error("GET /api/districts/[district] failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
