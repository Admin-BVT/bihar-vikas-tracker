import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = supabaseAdmin();

    const { data: projects, error } = await supabase
      .from("projects")
      .select("district, status");

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Calculate district stats
    const districtStats = projects.reduce((acc: any, project: any) => {
      const district = project.district;

      if (!acc[district]) {
        acc[district] = {
          name: district,
          projects: 0,
          completedProjects: 0,
        };
      }

      acc[district].projects += 1;

      if (project.status === "Completed") {
        acc[district].completedProjects += 1;
      }

      return acc;
    }, {});

    return NextResponse.json(Object.values(districtStats));
  } catch (err) {
    console.error("Districts API error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
