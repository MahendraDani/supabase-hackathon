import Sidebar from "@/components/custom/sidebar/Sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers"

interface ProfilePageProps {
  params: {
    username: string;
  }
}
/* 
------------------------------------------------------------------------------------------
TODO
------------------------------------------------------------------------------------------
ref : This page will be similar to hashnode.com/settings
All the features will be present there
------------------------------------------------------------------------------------------
*/
export default async function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div>
      <div className="mt-6 w-full flex justify-center items-center">
        <div className="w-[85%] flex justify-between items-start gap-8">
          <Sidebar />
          <div className="w-3/4 bg-green-100 min-h-[35rem] p-4">Hello</div>
        </div>
      </div>
    </div>
  )
}