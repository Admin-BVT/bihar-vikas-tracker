import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

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

  response.cookies.set("admin-auth", data.session.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return response;
}