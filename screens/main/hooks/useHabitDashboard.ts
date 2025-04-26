"use client"

import { useState, useMemo } from "react"
import { useHabits } from "@/lib/hooks/use-habits"

export function useHabitDashboard() {
  const { habits, addHabit, toggleHabitCompletion, deleteHabit, archiveHabit, updateHabitGoal, useStreakFreeze } =
    useHabits()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showCategoryFilter, setShowCategoryFilter] = useState(false)

  // Filter habits by selected category
  const filteredHabits = useMemo(() => {
    return selectedCategory
      ? habits.filter((habit) => !habit.archived && habit.category === selectedCategory)
      : habits.filter((habit) => !habit.archived)
  }, [habits, selectedCategory])

  // Get unique categories from habits
  const categories = useMemo(() => {
    return [...new Set(habits.map((habit) => habit.category))].filter(Boolean)
  }, [habits])

  return {
    habits,
    addHabit,
    toggleHabitCompletion,
    deleteHabit,
    archiveHabit,
    updateHabitGoal,
    useStreakFreeze,
    isDialogOpen,
    setIsDialogOpen,
    selectedCategory,
    setSelectedCategory,
    showCategoryFilter,
    setShowCategoryFilter,
    filteredHabits,
    categories
  }
}
