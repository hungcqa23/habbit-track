"use client"

import { ReactNode } from "react"
import { AppHeader } from "@/components/app-header"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <AppHeader />
      <div className="container max-w-6xl mx-auto py-8 px-4">
        {children}
      </div>
    </div>
  )
}
