import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const response = await supabase.auth.exchangeCodeForSession(code);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // If logic is success , user will be redirected to this route
    // TODO figure out a way to redirect users who login with google or github to /onboard/[id] route without breaking the app
    if (user) {
      return NextResponse.redirect(`${location.origin}/${user?.id}`);
    }
    return NextResponse.redirect(`${location.origin}/signup`);
  }
  //TODO :  THIS happens when there is some error, so show an error page instead
  return NextResponse.redirect(`${location.origin}/signup`);
}
