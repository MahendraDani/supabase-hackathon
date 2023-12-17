import { Footer } from "@/components/custom/Footer"
import Navbar from "@/components/custom/navbar/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className=" p-4 w-full md:w-[85%] mx-auto">
        <div className="mt-24 text-center mx-auto text-4xl md:text-6xl">
          <h1 className="font-bold leading-20">Dive into the world of Amazing STORIES, POEMS and QUOTES</h1>
        </div>
        <div className="text-center mt-8">
          <p className="text-xl md:text-2xl w-[60%] mx-auto">Rhymes and Fables is a platform to showcase your creativity in form of stories, poems and quotes.</p>
        </div>
        <div className="text-center mt-8">
          <Link href={"/login"}>
            <Button>
              Get Started
            </Button>
          </Link>
        </div>
      </div>

    </main>
  )
}

