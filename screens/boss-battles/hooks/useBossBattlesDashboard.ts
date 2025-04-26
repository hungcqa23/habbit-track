"use client"

import { useState, useMemo } from "react"
import { useBossBattles } from "@/lib/hooks/use-boss-battles"
import type { BossBattle } from "@/lib/types"

export function useBossBattlesDashboard() {
  const {
    bossBattles,
    addBossBattle,
    acceptBossBattle,
    completeBossBattle,
    abandonBossBattle,
    updateBossBattleProgress,
  } = useBossBattles()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState<string>("newest")

  // Filter boss battles by status and difficulty
  const filterBossBattles = (status: BossBattle["status"]) => {
    let filtered = bossBattles.filter((battle) => battle.status === status)

    if (filterDifficulty) {
      filtered = filtered.filter((battle) => battle.difficulty === filterDifficulty)
    }

    // Sort the battles
    return sortBossBattles(filtered)
  }

  // Sort boss battles based on selected option
  const sortBossBattles = (battles: BossBattle[]) => {
    switch (sortOption) {
      case "newest":
        return [...battles].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      case "oldest":
        return [...battles].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      case "progress":
        return [...battles].sort(
          (a, b) => b.currentProgress / b.requiredProgress - a.currentProgress / a.requiredProgress
        )
      case "difficulty":
        const difficultyOrder = { easy: 1, medium: 2, hard: 3, epic: 4 }
        return [...battles].sort(
          (a, b) => difficultyOrder[b.difficulty as keyof typeof difficultyOrder] - difficultyOrder[a.difficulty as keyof typeof difficultyOrder]
        )
      default:
        return battles
    }
  }

  // Memoize filtered battles to avoid recalculation on every render
  const filteredBattles = useMemo(() => {
    return {
      activeBattles: filterBossBattles("active"),
      availableBattles: filterBossBattles("available"),
      completedBattles: filterBossBattles("completed"),
      abandonedBattles: filterBossBattles("abandoned")
    }
  }, [bossBattles, filterDifficulty, sortOption])

  // Simulate progress update for demo purposes
  const simulateProgressUpdate = (id: string) => {
    const battle = bossBattles.find((b) => b.id === id)
    if (battle) {
      const newProgress = Math.min(battle.requiredProgress, battle.currentProgress + Math.floor(battle.requiredProgress * 0.2))
      updateBossBattleProgress(id, newProgress)
    }
  }

  return {
    bossBattles,
    addBossBattle,
    acceptBossBattle,
    completeBossBattle,
    abandonBossBattle,
    updateBossBattleProgress,
    isDialogOpen,
    setIsDialogOpen,
    filterDifficulty,
    setFilterDifficulty,
    sortOption,
    setSortOption,
    simulateProgressUpdate,
    ...filteredBattles
  }
}
