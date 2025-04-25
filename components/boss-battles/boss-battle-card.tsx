"use client"

import { useState } from "react"
import { Shield, Swords, Trophy, Flame, Timer, Star, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BossBattleDetailsDialog } from "@/components/boss-battles/boss-battle-details-dialog"
import type { BossBattle } from "@/lib/types"

interface BossBattleCardProps {
  bossBattle: BossBattle
  onAccept: (id: string) => void
  onComplete: (id: string) => void
  onAbandon: (id: string) => void
}

export function BossBattleCard({ bossBattle, onAccept, onComplete, onAbandon }: BossBattleCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)

  // Calculate progress percentage
  const progressPercentage = Math.min(100, Math.round((bossBattle.currentProgress / bossBattle.requiredProgress) * 100))

  // Determine if the battle is active (accepted but not completed)
  const isActive = bossBattle.status === "active"

  // Determine if the battle is completed
  const isCompleted = bossBattle.status === "completed"

  // Determine if the battle is available but not yet accepted
  const isAvailable = bossBattle.status === "available"

  // Determine if the battle is failed/abandoned
  const isAbandoned = bossBattle.status === "abandoned"

  // Calculate days remaining if there's a deadline
  const daysRemaining = bossBattle.deadline
    ? Math.max(0, Math.ceil((new Date(bossBattle.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  // Determine difficulty color
  const getDifficultyColor = () => {
    switch (bossBattle.difficulty) {
      case "easy":
        return "text-green-500 bg-green-500/10"
      case "medium":
        return "text-amber-500 bg-amber-500/10"
      case "hard":
        return "text-orange-500 bg-orange-500/10"
      case "epic":
        return "text-red-500 bg-red-500/10"
      case "legendary":
        return "text-purple-500 bg-purple-500/10"
      default:
        return "text-primary bg-primary/10"
    }
  }

  return (
    <>
      <Card
        className={`
        overflow-hidden border-none shadow-lg transition-all
        ${isActive ? "bg-gradient-to-br from-primary/10 to-background" : ""}
        ${isCompleted ? "bg-gradient-to-br from-green-500/10 to-background" : ""}
        ${isAbandoned ? "bg-gradient-to-br from-red-500/10 to-background opacity-70" : ""}
      `}
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary/60 to-primary/30"></div>

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Swords className={`h-5 w-5 ${isCompleted ? "text-green-500" : "text-primary"}`} />
                {bossBattle.name}
              </CardTitle>
              <CardDescription>{bossBattle.description}</CardDescription>
            </div>
            <Badge className={getDifficultyColor()}>
              {bossBattle.difficulty.charAt(0).toUpperCase() + bossBattle.difficulty.slice(1)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="space-y-4">
            {/* Battle progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-primary" /> Battle Progress
                </span>
                <span>
                  {bossBattle.currentProgress}/{bossBattle.requiredProgress}
                </span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-2.5"
                indicatorClassName={`
                  ${isCompleted ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-gradient-to-r from-primary to-primary/80"}
                `}
              />
            </div>

            {/* Rewards section */}
            <div className="flex flex-wrap gap-2">
              {bossBattle.rewards.map((reward, index) => (
                <div key={index} className="flex items-center gap-1 text-sm bg-primary/10 rounded-full px-2.5 py-1">
                  {reward.type === "coins" && (
                    <>
                      <span className="text-yellow-500">💰</span>
                      <span>{reward.amount} coins</span>
                    </>
                  )}
                  {reward.type === "strength" && (
                    <>
                      <span className="text-red-500">💪</span>
                      <span>+{reward.amount} strength</span>
                    </>
                  )}
                  {reward.type === "smart" && (
                    <>
                      <span className="text-blue-500">🧠</span>
                      <span>+{reward.amount} smart</span>
                    </>
                  )}
                  {reward.type === "experience" && (
                    <>
                      <Star className="h-3.5 w-3.5 text-purple-500" />
                      <span>{reward.amount} XP</span>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Deadline if exists */}
            {daysRemaining !== null && (
              <div className="flex items-center gap-2 text-sm">
                <Timer className={`h-4 w-4 ${daysRemaining < 3 ? "text-red-500" : "text-muted-foreground"}`} />
                <span className={daysRemaining < 3 ? "text-red-500 font-medium" : "text-muted-foreground"}>
                  {daysRemaining} days remaining
                </span>
              </div>
            )}

            {/* Status badges */}
            {isCompleted && (
              <div className="flex items-center gap-2 text-green-500 bg-green-500/10 rounded-md px-3 py-1.5">
                <Trophy className="h-4 w-4" />
                <span className="text-sm font-medium">Victory! Battle Completed</span>
              </div>
            )}

            {isAbandoned && (
              <div className="flex items-center gap-2 text-red-500 bg-red-500/10 rounded-md px-3 py-1.5">
                <Flame className="h-4 w-4" />
                <span className="text-sm font-medium">Battle Abandoned</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          {isAvailable && (
            <Button className="w-full gap-2" onClick={() => onAccept(bossBattle.id)}>
              Accept Challenge
              <Swords className="h-4 w-4" />
            </Button>
          )}

          {isActive && (
            <div className="flex w-full gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setDetailsOpen(true)}>
                View Details
              </Button>
              <Button
                className="flex-1 gap-1"
                onClick={() => onComplete(bossBattle.id)}
                disabled={progressPercentage < 100}
              >
                Complete
                <Trophy className="h-4 w-4" />
              </Button>
            </div>
          )}

          {(isCompleted || isAbandoned) && (
            <Button variant="outline" className="w-full" onClick={() => setDetailsOpen(true)}>
              View Details
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>

      <BossBattleDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        bossBattle={bossBattle}
        onAbandon={onAbandon}
      />
    </>
  )
}
