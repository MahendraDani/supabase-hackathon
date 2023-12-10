import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const response = await supabase.auth.exchangeCodeForSession(code);

    return NextResponse.redirect("http://localhost:3000/settings");
  }
  NextResponse.redirect("http://localhost:3000/settings");
}
