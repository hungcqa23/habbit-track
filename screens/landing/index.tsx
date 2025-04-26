"use client"

import { Suspense } from "react"
import { Footer } from "@/components/landing"
import { LandingHeader, LandingSections } from "./components"
import { useActiveSection } from "./hooks"

function LandingContent() {
  const activeSection = useActiveSection();
  return (
    <>
      <LandingHeader activeSection={activeSection} />
      <LandingSections />
      <Footer />
    </>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="min-h-screen bg-background">
          <LandingHeader activeSection={null} />
          <LandingSections />
          <Footer />
        </div>
      }>
        <LandingContent />
      </Suspense>
    </div>
  )
}
