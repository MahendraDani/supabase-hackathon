import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const response = await supabase.auth.exchangeCodeForSession(code);
    // console.log(response);
    if (response.data) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Replace here with https://rhymes-and-fables.vercel.app/onoard/[userid]
      // if (user) {
      //   return NextResponse.redirect(
      //     `http://localhost:3000/onboard/${user.id}`
      //   );
      // }
      const profilesResponse = await supabase
        .from("profiles")
        .select("user_id")
        .eq("user_id", user.id);
      // console.log(profilesResponse);
      if (profilesResponse.data.length === 0) {
        return NextResponse.redirect(
          `https://rhymes-and-fables.vercel.app/onboard/${user.id}`
        );
      } else {
        return NextResponse.redirect(
          "https://rhymes-and-fables.vercel.app/feeds"
        );
      }
    }
  }
  //TODO :  THIS happens when there is some error, so show an error page instead
  return NextResponse.redirect(`https://rhymes-and-fables.vercel.app/signup`);
}
