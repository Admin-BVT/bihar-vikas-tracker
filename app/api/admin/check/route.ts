import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies(); // ← MUST be awaited
  const auth = cookieStore.get("admin-auth");

  return NextResponse.json({
    authenticated: !!auth,
  });
}