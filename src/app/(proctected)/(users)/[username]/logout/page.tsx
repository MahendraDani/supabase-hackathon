"use client";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      JSON.stringify(error, null, 2)
    }
    router.push("/");
  }
  return (
    <div>
      <h1>Do you really want to logout</h1>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  )
}