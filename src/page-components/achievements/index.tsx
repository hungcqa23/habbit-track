"use client"

import { AppHeader } from "@/components/app-header"
import { AchievementsList } from "./components"
import { useHabits } from "@/lib/hooks/use-habits"

export default function AchievementsPage() {
  const { habits } = useHabits()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <AppHeader />
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Achievements</h1>
        <p className="text-muted-foreground mb-8">
          Track your progress and unlock achievements as you build consistent habits.
        </p>
        <AchievementsList habits={habits} />
      </div>
    </div>
  )
}
