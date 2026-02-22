import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const supabase = supabaseAdmin();

  const { data, error } = await supabase
    .from("projects")
    .select("category");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result: Record<string, number> = {};

  for (const row of data ?? []) {
    result[row.category] = (result[row.category] || 0) + 1;
  }

  return NextResponse.json(result);
}
