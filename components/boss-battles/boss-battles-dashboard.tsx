"use client"

import { useState } from "react"
import { Swords, Plus, Trophy, Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BossBattleCard } from "@/components/boss-battles/boss-battle-card"
import { NewBossBattleDialog } from "@/components/boss-battles/new-boss-battle-dialog"
import { useBossBattles } from "@/lib/hooks/use-boss-battles"
import type { BossBattle } from "@/lib/types"

export function BossBattlesDashboard() {
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

  // Sort boss battles
  const sortBossBattles = (battles: BossBattle[]) => {
    const sorted = [...battles]

    switch (sortOption) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      case "oldest":
        return sorted.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      case "difficulty-asc":
        return sorted.sort((a, b) => {
          const difficultyOrder = { easy: 1, medium: 2, hard: 3, epic: 4, legendary: 5 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        })
      case "difficulty-desc":
        return sorted.sort((a, b) => {
          const difficultyOrder = { easy: 1, medium: 2, hard: 3, epic: 4, legendary: 5 }
          return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]
        })
      case "progress":
        return sorted.sort((a, b) => {
          const progressA = (a.currentProgress / a.requiredProgress) * 100
          const progressB = (b.currentProgress / b.requiredProgress) * 100
          return progressB - progressA
        })
      default:
        return sorted
    }
  }

  // Get active, available, and completed boss battles
  const activeBattles = filterBossBattles("active")
  const availableBattles = filterBossBattles("available")
  const completedBattles = filterBossBattles("completed")
  const abandonedBattles = filterBossBattles("abandoned")

  // Simulate progress update (in a real app, this would be tied to habit completion)
  const simulateProgressUpdate = (id: string) => {
    updateBossBattleProgress(id, 1) // Increment progress by 1
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Swords className="h-6 w-6 text-primary" />
            Boss Battles
          </h2>
          <p className="text-muted-foreground mt-1">Take on challenging habit milestones and earn special rewards</p>
        </div>

        <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Boss Battle
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterDifficulty || ""} onValueChange={(value) => setFilterDifficulty(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
              <SelectItem value="epic">Epic</SelectItem>
              <SelectItem value="legendary">Legendary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="difficulty-asc">Easiest First</SelectItem>
              <SelectItem value="difficulty-desc">Hardest First</SelectItem>
              <SelectItem value="progress">Most Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Swords className="h-4 w-4" />
            Active
            {activeBattles.length > 0 && (
              <span className="ml-1 bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs">
                {activeBattles.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="available" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Available
            {availableBattles.length > 0 && (
              <span className="ml-1 bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs">
                {availableBattles.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Completed
            {completedBattles.length > 0 && (
              <span className="ml-1 bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs">
                {completedBattles.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="abandoned" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Abandoned
            {abandonedBattles.length > 0 && (
              <span className="ml-1 bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs">
                {abandonedBattles.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-0">
          {activeBattles.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <p className="text-muted-foreground">You don't have any active boss battles.</p>
              <Button variant="outline" className="mt-4" onClick={() => setIsDialogOpen(true)}>
                Create a Boss Battle
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeBattles.map((battle) => (
                <div key={battle.id} className="space-y-2">
                  <BossBattleCard
                    bossBattle={battle}
                    onAccept={acceptBossBattle}
                    onComplete={completeBossBattle}
                    onAbandon={abandonBossBattle}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => simulateProgressUpdate(battle.id)}
                  >
                    Simulate Progress Update
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="available" className="mt-0">
          {availableBattles.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <p className="text-muted-foreground">You don't have any available boss battles.</p>
              <Button variant="outline" className="mt-4" onClick={() => setIsDialogOpen(true)}>
                Create a Boss Battle
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableBattles.map((battle) => (
                <BossBattleCard
                  key={battle.id}
                  bossBattle={battle}
                  onAccept={acceptBossBattle}
                  onComplete={completeBossBattle}
                  onAbandon={abandonBossBattle}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          {completedBattles.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <p className="text-muted-foreground">You haven't completed any boss battles yet.</p>
              <Button variant="outline" className="mt-4" onClick={() => setIsDialogOpen(true)}>
                Create a Boss Battle
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedBattles.map((battle) => (
                <BossBattleCard
                  key={battle.id}
                  bossBattle={battle}
                  onAccept={acceptBossBattle}
                  onComplete={completeBossBattle}
                  onAbandon={abandonBossBattle}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="abandoned" className="mt-0">
          {abandonedBattles.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <p className="text-muted-foreground">You don't have any abandoned boss battles.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {abandonedBattles.map((battle) => (
                <BossBattleCard
                  key={battle.id}
                  bossBattle={battle}
                  onAccept={acceptBossBattle}
                  onComplete={completeBossBattle}
                  onAbandon={abandonBossBattle}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <NewBossBattleDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAddBossBattle={addBossBattle} />
    </div>
  )
}
