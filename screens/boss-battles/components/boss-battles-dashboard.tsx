"use client"

import { Swords, Plus, Trophy, Filter, ArrowUpDown, Shield, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BossBattleCard } from "./boss-battle-card"
import { NewBossBattleDialog } from "./new-boss-battle-dialog"
import { useBossBattlesDashboard } from "../hooks"

export function BossBattlesDashboard() {
  const {
    addBossBattle,
    acceptBossBattle,
    completeBossBattle,
    abandonBossBattle,
    isDialogOpen,
    setIsDialogOpen,
    filterDifficulty,
    setFilterDifficulty,
    sortOption,
    setSortOption,
    simulateProgressUpdate,
    activeBattles,
    availableBattles,
    completedBattles,
    abandonedBattles
  } = useBossBattlesDashboard()

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

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Select value={filterDifficulty || ""} onValueChange={(value) => setFilterDifficulty(value || null)}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>{filterDifficulty ? `${filterDifficulty.charAt(0).toUpperCase() + filterDifficulty.slice(1)} Difficulty` : "All Difficulties"}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Difficulties</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
            <SelectItem value="epic">Epic</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <span>Sort By</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
            <SelectItem value="difficulty">Difficulty</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Swords className="h-4 w-4" />
            <span className="hidden sm:inline">Active</span>
            <span className="sm:hidden">Active</span>
            {activeBattles.length > 0 && <Badge variant="secondary">{activeBattles.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="available" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Available</span>
            <span className="sm:hidden">Available</span>
            {availableBattles.length > 0 && <Badge variant="secondary">{availableBattles.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Completed</span>
            <span className="sm:hidden">Done</span>
            {completedBattles.length > 0 && <Badge variant="secondary">{completedBattles.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="abandoned" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            <span className="hidden sm:inline">Abandoned</span>
            <span className="sm:hidden">Failed</span>
            {abandonedBattles.length > 0 && <Badge variant="secondary">{abandonedBattles.length}</Badge>}
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
