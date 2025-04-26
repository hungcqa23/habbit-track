"use client"

import { useMemo } from "react"
import { useHabits } from "@/lib/hooks/use-habits"

export function useArchivedHabits() {
  const { habits, deleteHabit, restoreHabit } = useHabits()
  
  // Filter habits to get only archived ones
  const archivedHabits = useMemo(() => {
    return habits.filter((habit) => habit.archived)
  }, [habits])

  return {
    archivedHabits,
    deleteHabit,
    restoreHabit,
    hasArchivedHabits: archivedHabits.length > 0
  }
}
