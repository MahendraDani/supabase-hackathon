import { ReactNode } from "react";
import { Metadata } from "next"

interface FeedsPageLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Feeds | R&F",
  description: "Feeds page"
}


const FeedsPageLayout = ({ children }: FeedsPageLayoutProps) => {
  return (
    <>
      {children}
    </>
  )
}
export default FeedsPageLayout;