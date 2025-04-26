"use client"

import { Footer } from "@/components/landing"
import { LandingHeader, LandingSections } from "./components"
import { useActiveSection } from "./hooks"

export default function LandingPage() {
  const activeSection = useActiveSection();
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader activeSection={activeSection} />
      <LandingSections />
      <Footer />
    </div>
  )
}
