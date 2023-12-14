import { ReactNode } from "react";
import { Metadata } from "next"
import Sidebar from "@/components/custom/sidebar/Sidebar";

interface ProfileOptionsPageLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Settings | R&F",
  description: "Profile Options page"
}


const ProfilePageLayout = ({ children }: ProfileOptionsPageLayoutProps) => {
  return (
    <div className="mt-6 w-full flex justify-center items-center">
      <div className="w-[85%] flex justify-between items-start gap-8">
        <Sidebar />
        <div className="w-3/4 bg-green-100 min-h-[35rem] p-4">{children}</div>
      </div>
    </div>
  )
}
export default ProfilePageLayout;