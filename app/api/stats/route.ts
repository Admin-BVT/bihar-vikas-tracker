import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

type AggregateRow = {
  budget: number | null;
  beneficiaries: number | null;
};

export async function GET() {
  try {
    const supabase = supabaseAdmin();

    // Total projects
    const { count: totalProjects, error: totalError } =
      await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

    if (totalError) throw totalError;

    // Status counts
    const statuses = ["Completed", "Ongoing", "Delayed"] as const;

    const statusCounts = await Promise.all(
      statuses.map(async (status) => {
        const { count, error } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("status", status);

        if (error) throw error;
        return [status, count ?? 0] as const;
      })
    );

    const statusMap = Object.fromEntries(statusCounts);

    // Budget & beneficiaries
    const { data, error: aggError } = await supabase
      .from("projects")
      .select("budget, beneficiaries");

    if (aggError) throw aggError;

    const rows = (data ?? []) as AggregateRow[];

    const totalBudget = rows.reduce(
      (sum, row) => sum + Number(row.budget ?? 0),
      0
    );

    const totalBeneficiaries = rows.reduce(
      (sum, row) => sum + Number(row.beneficiaries ?? 0),
      0
    );

    return NextResponse.json({
      totalProjects: totalProjects ?? 0,
      completedProjects: statusMap.completed,
      ongoingProjects: statusMap.ongoing,
      delayedProjects: statusMap.delayed,
      totalBudget,
      totalBeneficiaries,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
