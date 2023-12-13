"use client";
import Link from "next/link";
import { ModeToggle } from "../theme/theme";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

const Navbar = async () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      JSON.stringify(error, null, 2);
    }
    router.push("/");
  }

  return (
    <div className="w-[90%] mx-auto border-b-[1px] border-slate-200">
      <nav className="p-4 flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Rhymes & Fables
            </h2>
          </Link>
        </div>

        <div >
          {/* {!session ? <div className="flex justify-between items-center gap-4">
            <Link href={"/login"}>Login</Link>
            <Link href={"/signup"}>Sign up</Link>
            <ModeToggle />
          </div> :
            <Button variant={"secondary"} />
          } */}
          <div className="flex justify-between items-center gap-4">
            <Link href={"/login"}>Login</Link>
            <Link href={"/signup"}>Sign up</Link>
            <Button variant={"outline"} onClick={handleLogout}>Log out</Button>
            <ModeToggle />
          </div>
        </div>
      </nav >
    </div >
  )
}
export default Navbar;