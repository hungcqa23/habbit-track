"use client"

import { ReactNode } from "react"

interface ContentContainerProps {
  children: ReactNode
}

export function ContentContainer({ children }: ContentContainerProps) {
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      {children}
    </div>
  )
}
