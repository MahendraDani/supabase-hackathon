
import "@/app/globals.css";
import { Inter as FontSans, Open_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/custom/theme/theme-provider";
import { cn } from "@/lib/utils";
import Navbar from '@/components/custom/navbar/navbar';
import { Toaster } from "@/components/ui/toaster"
import { Metadata } from "next";



export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "700"]
})

export const metadata: Metadata = {
  title: "Rhymes and Fables",
  description: "Landing page of website"
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background", fontSans.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Navbar /> */}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
