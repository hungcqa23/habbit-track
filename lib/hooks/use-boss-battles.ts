"use client"

import { useState, useEffect } from "react"
import { useProfile } from "@/lib/hooks/use-profile"
import type { BossBattle } from "@/lib/types"

// Sample data
const initialBossBattles: BossBattle[] = [
  {
    id: "boss1",
    name: "7-Day Workout Challenge",
    description: "Complete a full week of daily workouts to build your strength",
    difficulty: "medium",
    status: "active",
    currentProgress: 3,
    requiredProgress: 7,
    startDate: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
    deadline: new Date(Date.now() + 4 * 86400000).toISOString(), // 4 days from now
    requirements: [
      { description: "Complete 7 days of workouts", detail: "At least 30 minutes each day", completed: false },
      { description: "Include 3 cardio sessions", completed: true },
      { description: "Include 3 strength training sessions", completed: false },
    ],
    rewards: [
      { type: "strength", amount: 10 },
      { type: "coins", amount: 100 },
      { type: "experience", amount: 200 },
    ],
  },
  {
    id: "boss2",
    name: "Reading Marathon",
    description: "Read consistently for two weeks to boost your knowledge",
    difficulty: "medium",
    status: "available",
    currentProgress: 0,
    requiredProgress: 14,
    startDate: new Date().toISOString(),
    requirements: [
      { description: "Read for at least 30 minutes daily", completed: false },
      { description: "Finish at least one book", completed: false },
      { description: "Take notes on what you've learned", completed: false },
    ],
    rewards: [
      { type: "smart", amount: 15 },
      { type: "coins", amount: 150 },
      { type: "experience", amount: 300 },
    ],
  },
  {
    id: "boss3",
    name: "Early Riser Challenge",
    description: "Wake up at 6 AM every day for a week",
    difficulty: "hard",
    status: "completed",
    currentProgress: 7,
    requiredProgress: 7,
    startDate: new Date(Date.now() - 14 * 86400000).toISOString(), // 14 days ago
    completedDate: new Date(Date.now() - 7 * 86400000).toISOString(), // 7 days ago
    requirements: [
      { description: "Wake up at 6 AM every day", completed: true },
      { description: "No snoozing", completed: true },
      { description: "Complete a morning routine", detail: "Exercise, meditation, or journaling", completed: true },
    ],
    rewards: [
      { type: "strength", amount: 8 },
      { type: "smart", amount: 5 },
      { type: "coins", amount: 200 },
    ],
  },
  {
    id: "boss4",
    name: "Digital Detox",
    description: "Limit screen time to essential use only for 5 days",
    difficulty: "epic",
    status: "abandoned",
    currentProgress: 2,
    requiredProgress: 5,
    startDate: new Date(Date.now() - 10 * 86400000).toISOString(), // 10 days ago
    requirements: [
      { description: "No social media", completed: false },
      { description: "No TV or streaming services", completed: false },
      { description: "Phone usage only for essential communication", completed: false },
    ],
    rewards: [
      { type: "smart", amount: 12 },
      { type: "coins", amount: 250 },
      { type: "experience", amount: 350 },
    ],
  },
]

export function useBossBattles() {
  const [bossBattles, setBossBattles] = useState<BossBattle[]>(initialBossBattles)
  const { profile, addCoins, increaseAttribute } = useProfile()

  // Load boss battles from localStorage on initial render
  useEffect(() => {
    const savedBossBattles = localStorage.getItem("bossBattles")
    if (savedBossBattles) {
      setBossBattles(JSON.parse(savedBossBattles))
    }
  }, [])

  // Save boss battles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bossBattles", JSON.stringify(bossBattles))
  }, [bossBattles])

  // Add a new boss battle
  const addBossBattle = (bossBattle: Omit<BossBattle, "id" | "status" | "currentProgress" | "completedDate">) => {
    const newBossBattle: BossBattle = {
      ...bossBattle,
      id: `boss${Date.now()}`,
      status: "available",
      currentProgress: 0,
    }

    setBossBattles([...bossBattles, newBossBattle])
  }

  // Accept a boss battle
  const acceptBossBattle = (id: string) => {
    setBossBattles(bossBattles.map((battle) => (battle.id === id ? { ...battle, status: "active" } : battle)))
  }

  // Update boss battle progress
  const updateBossBattleProgress = (id: string, increment: number) => {
    setBossBattles(
      bossBattles.map((battle) => {
        if (battle.id === id && battle.status === "active") {
          const newProgress = Math.min(battle.currentProgress + increment, battle.requiredProgress)

          // Update requirements based on progress percentage
          const progressPercentage = (newProgress / battle.requiredProgress) * 100
          const updatedRequirements = battle.requirements.map((req, index) => {
            // Simple logic: mark requirements as completed based on progress thresholds
            // First requirement at 33%, second at 66%, third at 100%
            const thresholdPercentage = ((index + 1) / battle.requirements.length) * 100
            return {
              ...req,
              completed: progressPercentage >= thresholdPercentage,
            }
          })

          return {
            ...battle,
            currentProgress: newProgress,
            requirements: updatedRequirements,
          }
        }
        return battle
      }),
    )
  }

  // Complete a boss battle and claim rewards
  const completeBossBattle = (id: string) => {
    const battle = bossBattles.find((b) => b.id === id)

    if (!battle || battle.currentProgress < battle.requiredProgress) {
      return
    }

    // Apply rewards
    battle.rewards.forEach((reward) => {
      if (reward.type === "coins") {
        addCoins(reward.amount)
      } else if (reward.type === "strength" || reward.type === "smart") {
        increaseAttribute(reward.type, reward.amount)
      }
      // Experience points would be handled by the profile system
    })

    // Mark as completed
    setBossBattles(
      bossBattles.map((battle) =>
        battle.id === id
          ? {
              ...battle,
              status: "completed",
              completedDate: new Date().toISOString(),
              requirements: battle.requirements.map((req) => ({ ...req, completed: true })),
            }
          : battle,
      ),
    )
  }

  // Abandon a boss battle
  const abandonBossBattle = (id: string) => {
    setBossBattles(bossBattles.map((battle) => (battle.id === id ? { ...battle, status: "abandoned" } : battle)))
  }

  return {
    bossBattles,
    addBossBattle,
    acceptBossBattle,
    completeBossBattle,
    abandonBossBattle,
    updateBossBattleProgress,
  }
}
