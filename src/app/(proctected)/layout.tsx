
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ReactNode } from "react"
import { cookies } from "next/headers"

type ProctectedLayoutProps = {
  children: ReactNode
}
const ProctectedLayout = async ({ children }: ProctectedLayoutProps) => {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    return (
      <div className="min-h-screen text-black bg-gradient-to-br from-teal-50 via-red-100  to-violet-50">
        {children}
      </div>
    )
  } {
    return (<div>You are not LOGGED IN !</div>)
  }


}
export default ProctectedLayout;