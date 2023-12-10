"use client";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/custom/theme/theme-provider";
import { cn } from "@/lib/utils";
import Navbar from '@/components/custom/navbar/navbar';
import { Toaster } from "@/components/ui/toaster"



export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
