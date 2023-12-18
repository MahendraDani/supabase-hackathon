import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import { Metadata } from "next"
import { ReactNode } from "react"
import ProtectedNavbar from "@/components/custom/navbar/proctected-navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <div>
        <ProtectedNavbar />
        <div className="p-4">
          {children}
        </div>
      </div>

    )
  } else {
    return (
      <div className="min-h-[30rem] flex justify-center items-center">
        <p className="text-3xl md:text-5xl dark:text-sky-200 text-slate-700">Sorry! You are not authorized to view this page</p>
        <Link href={"/"}>
          <Button>Go Back</Button>
        </Link>
      </div>
    )
  }

}