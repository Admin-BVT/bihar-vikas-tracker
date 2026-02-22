import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const supabase = supabaseAdmin();

  const { data, error } = await supabase
    .from("projects")
    .select("status");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let completed = 0;
  let ongoing = 0;
  let delayed = 0;

  for (const row of data ?? []) {
    const s = row.status?.toLowerCase().trim();
    if (s === "completed") completed++;
    else if (s === "ongoing") ongoing++;
    else if (s === "delayed") delayed++;
  }

  return NextResponse.json({
    completed,
    ongoing,
    delayed,
  });
}
