"use client"

import { useState, useEffect } from "react"
import type { Habit } from "@/lib/types"

// Sample data
const initialHabits: Habit[] = [
  {
    id: "1",
    name: "Drink water",
    description: "Drink 8 glasses of water",
    frequency: "daily",
    category: "Health",
    streak: 5,
    completedDates: [
      new Date(Date.now() - 86400000 * 4).toISOString().split("T")[0],
      new Date(Date.now() - 86400000 * 3).toISOString().split("T")[0],
      new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
      new Date(Date.now() - 86400000).toISOString().split("T")[0],
      new Date().toISOString().split("T")[0],
    ],
    goal: 30,
    archived: false,
    streakFreezes: 1,
    achievements: ["First Week"],
    longestStreak: 5,
    level: 1,
    experience: 50,
  },
  {
    id: "2",
    name: "Exercise",
    description: "30 minutes of exercise",
    frequency: "daily",
    category: "Fitness",
    streak: 3,
    completedDates: [
      new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
      new Date(Date.now() - 86400000).toISOString().split("T")[0],
      new Date().toISOString().split("T")[0],
    ],
    goal: 60,
    archived: false,
    streakFreezes: 1,
    achievements: [],
    longestStreak: 3,
    level: 1,
    experience: 30,
  },
  {
    id: "3",
    name: "Read",
    description: "Read for 20 minutes",
    frequency: "daily",
    category: "Learning",
    streak: 21,
    completedDates: Array.from({ length: 21 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (20 - i))
      return date.toISOString().split("T")[0]
    }),
    goal: 100,
    archived: false,
    streakFreezes: 2,
    achievements: ["First Week", "Two Weeks", "21 Day Habit"],
    longestStreak: 21,
    level: 3,
    experience: 210,
  },
  {
    id: "4",
    name: "Meditate",
    description: "10 minutes of meditation",
    frequency: "daily",
    category: "Mindfulness",
    streak: 0,
    completedDates: [],
    goal: 21,
    archived: false,
    streakFreezes: 0,
    achievements: [],
    longestStreak: 0,
    level: 0,
    experience: 0,
  },
  {
    id: "5",
    name: "Journal",
    description: "Write in journal",
    frequency: "daily",
    category: "Mindfulness",
    streak: 14,
    completedDates: Array.from({ length: 14 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (13 - i))
      return date.toISOString().split("T")[0]
    }),
    goal: 30,
    archived: false,
    streakFreezes: 1,
    achievements: ["First Week", "Two Weeks"],
    longestStreak: 14,
    level: 2,
    experience: 140,
  },
  {
    id: "6",
    name: "Learn Spanish",
    description: "Practice Spanish for 15 minutes",
    frequency: "daily",
    category: "Learning",
    streak: 0,
    completedDates: [],
    goal: 90,
    archived: true,
    streakFreezes: 0,
    achievements: ["First Week"],
    longestStreak: 8,
    level: 1,
    experience: 80,
  },
]

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits)

  // Load habits from localStorage on initial render
  useEffect(() => {
    const savedHabits = localStorage.getItem("habits")
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits))
    }
  }, [])

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits))
  }, [habits])

  // Check for streak achievements
  const checkAchievements = (streak: number): string[] => {
    const achievements: string[] = []

    if (streak >= 7) achievements.push("First Week")
    if (streak >= 14) achievements.push("Two Weeks")
    if (streak >= 21) achievements.push("21 Day Habit")
    if (streak >= 30) achievements.push("30 Day Streak")
    if (streak >= 60) achievements.push("60 Day Streak")
    if (streak >= 100) achievements.push("100 Day Streak")
    if (streak >= 180) achievements.push("180 Day Streak")
    if (streak >= 365) achievements.push("365 Day Streak")

    return achievements
  }

  // Calculate experience points based on streak
  const calculateExperience = (streak: number): number => {
    return streak * 10
  }

  // Calculate level based on experience
  const calculateLevel = (experience: number): number => {
    return Math.floor(experience / 100) + 1
  }

  const addHabit = (
    habit: Omit<
      Habit,
      | "id"
      | "streak"
      | "completedDates"
      | "archived"
      | "streakFreezes"
      | "achievements"
      | "longestStreak"
      | "level"
      | "experience"
    >,
  ) => {
    const newHabit: Habit = {
      ...habit,
      id: Math.random().toString(36).substring(7),
      streak: 0,
      completedDates: [],
      archived: false,
      streakFreezes: 1, // Start with one streak freeze
      achievements: [],
      longestStreak: 0,
      level: 1,
      experience: 0,
    }
    setHabits([...habits, newHabit])
  }

  const toggleHabitCompletion = (id: string) => {
    const today = new Date().toISOString().split("T")[0]

    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const isCompleted = habit.completedDates.includes(today)
          let completedDates = [...habit.completedDates]
          let streak = habit.streak
          let longestStreak = habit.longestStreak
          let achievements = [...habit.achievements]
          let experience = habit.experience
          let level = habit.level

          if (isCompleted) {
            // Remove today from completed dates
            completedDates = completedDates.filter((date) => date !== today)
            // Decrease streak if it was active
            if (streak > 0) streak -= 1
          } else {
            // Add today to completed dates
            completedDates.push(today)
            // Increase streak
            streak += 1

            // Update longest streak if current streak is longer
            if (streak > longestStreak) {
              longestStreak = streak
            }

            // Check for new achievements
            const newAchievements = checkAchievements(streak)
            achievements = [...new Set([...achievements, ...newAchievements])]

            // Update experience and level
            experience = calculateExperience(streak)
            level = calculateLevel(experience)

            // Award streak freeze at certain milestones
            if (streak === 30 || streak === 60 || streak === 100) {
              // Award an additional streak freeze
              return {
                ...habit,
                completedDates,
                streak,
                longestStreak,
                achievements,
                experience,
                level,
                streakFreezes: habit.streakFreezes + 1,
              }
            }
          }

          return {
            ...habit,
            completedDates,
            streak,
            longestStreak,
            achievements,
            experience,
            level,
          }
        }
        return habit
      }),
    )
  }

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id))
  }

  const archiveHabit = (id: string) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, archived: true } : habit)))
  }

  const restoreHabit = (id: string) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, archived: false } : habit)))
  }

  const updateHabitGoal = (id: string, goal: number) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, goal } : habit)))
  }

  const useStreakFreeze = (id: string) => {
    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

    setHabits(
      habits.map((habit) => {
        if (habit.id === id && habit.streakFreezes > 0) {
          // Only use streak freeze if yesterday is not completed
          // and today is not already completed
          if (!habit.completedDates.includes(yesterday) && !habit.completedDates.includes(today)) {
            return {
              ...habit,
              completedDates: [...habit.completedDates, yesterday],
              streakFreezes: habit.streakFreezes - 1,
            }
          }
        }
        return habit
      }),
    )
  }

  return {
    habits,
    addHabit,
    toggleHabitCompletion,
    deleteHabit,
    archiveHabit,
    restoreHabit,
    updateHabitGoal,
    useStreakFreeze,
  }
}
