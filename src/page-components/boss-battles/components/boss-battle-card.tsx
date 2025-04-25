"use client"

import { useState } from "react"
import { Shield, Swords, Trophy, Flame, Timer, Star, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BossBattleDetailsDialog } from "./boss-battle-details-dialog"
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
    ? Math.ceil((new Date(bossBattle.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null

  // Get color based on difficulty
  const getDifficultyColor = () => {
    switch (bossBattle.difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "medium":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "hard":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "epic":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-primary/10 text-primary border-primary/20"
    }
  }

  return (
    <>
      <Card
        className={`
          overflow-hidden transition-all
          ${isCompleted ? "border-green-500/30" : ""}
          ${isAbandoned ? "border-red-500/30 opacity-70" : ""}
        `}
      >
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
        <CardContent>
          <div className="space-y-4">
            {/* Progress bar */}
            {(isActive || isCompleted || isAbandoned) && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>
                    {bossBattle.currentProgress}/{bossBattle.requiredProgress}
                  </span>
                </div>
                <Progress
                  value={progressPercentage}
                  className="h-2"
                  indicatorClassName={`
                    ${isCompleted ? "bg-gradient-to-r from-green-500 to-green-400" : ""}
                    ${isAbandoned ? "bg-gradient-to-r from-red-500 to-red-400" : ""}
                  `}
                />
              </div>
            )}

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
