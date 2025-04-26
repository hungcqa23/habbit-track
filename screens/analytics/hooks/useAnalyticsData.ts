"use client"

import { useMemo } from "react"
import { useHabits } from "@/lib/hooks/use-habits"
import type { Habit } from "@/lib/types"

export function useAnalyticsData() {
  const { habits } = useHabits()
  
  // Memoize the analytics data to avoid recalculation on every render
  const analyticsData = useMemo(() => {
    const activeHabits = habits.filter((habit) => !habit.archived)
    
    // Calculate overall stats
    const totalHabits = activeHabits.length
    const totalCompletions = activeHabits.reduce((sum, habit) => sum + habit.completedDates.length, 0)
    
    const averageStreak =
      totalHabits > 0 ? Math.round(activeHabits.reduce((sum, habit) => sum + habit.streak, 0) / totalHabits) : 0
    
    const longestStreak = activeHabits.reduce((max, habit) => Math.max(max, habit.streak), 0)
    
    // Get today's date
    const today = new Date().toISOString().split("T")[0]
    
    // Calculate today's completion rate
    const habitsCompletedToday = activeHabits.filter((habit) => habit.completedDates.includes(today)).length
    
    const todayCompletionRate = totalHabits > 0 ? Math.round((habitsCompletedToday / totalHabits) * 100) : 0
    
    // Calculate total achievements
    const totalAchievements = activeHabits.reduce((sum, habit) => sum + habit.achievements.length, 0)
    
    return {
      habits,
      activeHabits,
      totalHabits,
      totalCompletions,
      averageStreak,
      longestStreak,
      habitsCompletedToday,
      todayCompletionRate,
      totalAchievements
    }
  }, [habits])
  
  return analyticsData
}
