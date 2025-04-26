"use client"

import { ReactNode } from "react"
import { LazyMotion, m, domAnimation } from "framer-motion"

interface MotionProviderProps {
  children: ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

// Export motion components for use throughout the app
export { m as motion }
export { AnimatePresence } from "framer-motion"
