"use client"

import { AchievementsList } from "./achievements-list"
import { useHabits } from "@/lib/hooks/use-habits"

export function AchievementsContent() {
  const { habits } = useHabits()

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Achievements</h1>
      <p className="text-muted-foreground mb-8">
        Track your progress and unlock achievements as you build consistent habits.
      </p>
      <AchievementsList habits={habits} />
    </>
  )
}
