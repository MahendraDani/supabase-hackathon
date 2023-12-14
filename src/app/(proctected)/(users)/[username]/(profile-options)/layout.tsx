import { ReactNode } from "react";
import { Metadata } from "next"

interface ProfileOptionsPageLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Settings | R&F",
  description: "Profile Options page"
}


const ProfilePageLayout = ({ children }: ProfileOptionsPageLayoutProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%] flex justify-between items-start gap-8">
        <div className="w-1/4 bg-red-50">I am sidebar</div>
        <div className="w-3/4 bg-green-100">{children}</div>
      </div>
    </div>
  )
}
export default ProfilePageLayout;