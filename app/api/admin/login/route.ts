import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rateLimit";


const ADMIN_EMAILS = [
  "biharvikastracker@gmail.com",
  "sharique.karim126@gmail.com"
];

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!ADMIN_EMAILS.includes(email)) {
    return NextResponse.json(
      { error: "Not authorized" },
      { status: 403 }
    );
  }
const ip = (await headers()).get("x-forwarded-for") ?? "unknown";

if (!checkRateLimit(ip)) {
  return NextResponse.json(
    { error: "Too many login attempts" },
    { status: 429 }
  );
}
  const { data, error } = await supabaseAdmin().auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin-auth", "true", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
})

  return response;
}