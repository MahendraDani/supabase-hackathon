import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import { Metadata } from "next"
import { ReactNode } from "react"
import ProtectedNavbar from "@/components/custom/navbar/proctected-navbar";

interface ProctectedPagesLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Profile | R&F",
  description: "Profile page"
}
export default async function ProctectedPagesLayout({ children }: ProctectedPagesLayoutProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user }, error } = await supabase.auth.getUser();
  if (user) {
    return (
      <div className="bg-red-100">
        <ProtectedNavbar />
        {children}
      </div>
    )
  } else {
    return (
      // TODO : Create a not Authorized page UI
      <div>
        <p>You are not AUHTORIZED</p>
      </div>
    )
  }

}