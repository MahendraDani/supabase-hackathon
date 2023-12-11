import type { Metadata } from 'next'
import { ReactNode } from 'react'
export const metadata: Metadata = {
  title: 'Login | R&F',
  description: 'Login page for user',
}

type SignupPageLayoutProps = {
  children: ReactNode
}

export default function SignupPageLayout({ children }: SignupPageLayoutProps) {
  return (
    <div className='w-full min-h-[40rem] flex justify-center items-center'>
      {children}
    </div>
  )
}
