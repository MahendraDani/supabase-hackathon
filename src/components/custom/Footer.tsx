import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa"
export const Footer = () => {
  return (
    <div className="w-full">
      <div className="p-4 md:w-[85%] mx-auto flex flex-col gap-4 justify-center items-center">
        <h3>Developed by Mahendra Dani</h3>
        <div className="flex justify-between items-center gap-4">
          <Link href={"https://github.com/MahendraDani/supabase-hackathon"} target="blank">
            <div className="text-2xl cursor-pointer"><FaGithub /></div>
          </Link>
          <Link href={"https://linkedin.com/in/mahendra-dani"} target="blank">
            <div className="text-2xl cursor-pointer"><FaLinkedin /></div>
          </Link>
        </div>
      </div>
    </div>
  )
}