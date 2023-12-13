import { ReactNode } from "react";

interface FeedsPageLayoutProps {
  children: ReactNode
}


const FeedsPageLayout = ({ children }: FeedsPageLayoutProps) => {
  return (
    <>
      {children}
    </>
  )
}
export default FeedsPageLayout;