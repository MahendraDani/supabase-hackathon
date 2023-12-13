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
    <>
      {children}
    </>
  )
}
export default ProfilePageLayout;