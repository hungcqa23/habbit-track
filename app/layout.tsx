import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { RootLayoutClient } from "@/providers/root-layout-client"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HabitTrack - Track Your Daily Habits",
  description: "A simple habit tracking app to help you build better habits and achieve your goals.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootLayoutClient className={inter.className}>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}
