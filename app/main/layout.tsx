"use client"

import { ReactNode } from "react"
import { AppHeader } from "@/components/main/AppHeader"
import { Footer } from "@/components/main/Footer"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}
