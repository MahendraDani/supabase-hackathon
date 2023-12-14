"use client";
import { usePathname } from "next/navigation"
export default function ProfilePageEdit() {
  // TODO :  Use server actions in this file to edit tables in supabase
  const pathname = usePathname();
  const paths = pathname.split("/");
  const username = paths[2];

  return (
    <div>{username}</div>
  )
}