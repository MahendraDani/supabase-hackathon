"use client";
import Link from "next/link";
import { ModeToggle } from "../theme/theme";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

const Navbar = async () => {
  const router = useRouter();

  return (
    <div className="w-[90%] mx-auto">
      <nav className="p-4 flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Rhymes & Fables
            </h2>
          </Link>
        </div>

        <div >
          <div className="flex justify-between items-center gap-4">
            <Link href={"/login"}>
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href={"/signup"}>
              <Button variant="secondary">Signup</Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav >
    </div >
  )
}
export default Navbar;