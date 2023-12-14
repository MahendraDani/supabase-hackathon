import Navbar from '@/components/custom/navbar/navbar'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
export const metadata: Metadata = {
  title: 'Story | Signup',
  description: 'Signup page for user',
}

type SignupPageLayoutProps = {
  children: ReactNode
}

export default function SignupPageLayout({ children }: SignupPageLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className='w-full min-h-[40rem] flex justify-center items-center'>
        {children}
      </div>

    </div>
  )
}
