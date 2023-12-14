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
      <div>This is private user's page</div>
      {params.username}
    </div>
  )
}