"use client";

import Link from "next/link";
import { ModeToggle } from "../theme/theme";

const Navbar = () => {

  return (
    <div className="w-[90%] mx-auto">
      <nav className="p-4 flex justify-between items-center">
        <div>
          <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Story
          </h2>
        </div>

        <div className="flex justify-between items-center gap-4">
          <Link href={"/login"}>Login</Link>
          <Link href={"/signup"}>Sign up</Link>
          <ModeToggle />
        </div>
      </nav>
    </div>
  )
}
export default Navbar;