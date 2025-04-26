"use client"

import React from "react"
import { ThemeProvider } from "@/providers/theme-provider"
import { MotionProvider } from "@/providers/motion-provider"

interface RootLayoutClientProps {
  children: React.ReactNode
  className: string
}

export function RootLayoutClient({ children, className }: RootLayoutClientProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionProvider>
        {children}
      </MotionProvider>
    </ThemeProvider>
  )
}
