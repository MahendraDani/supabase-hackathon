
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ReactNode } from "react"
import { cookies } from "next/headers"
import { Metadata } from "next";

type ProctectedLayoutProps = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Rhymes & Fables',
  description: 'Settings page of a user',
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
    // TODO : Show good UI for showing users that they are not logged in and give a button to redirect to login
    return (<div>You are not LOGGED IN !</div>)
  }


}
export default ProctectedLayout;