import { ReactNode } from "react";
import { Metadata } from "next"

interface ProfilePageLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Profile | R&F",
  description: "Profile page"
}


const ProfilePageLayout = ({ children }: ProfilePageLayoutProps) => {
  return (
    <div className="bg-red-100">
      {children}
    </div>
  )
}
export default ProfilePageLayout;