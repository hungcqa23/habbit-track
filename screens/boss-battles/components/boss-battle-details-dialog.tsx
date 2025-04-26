"use client"

import { useState } from "react"
import {
  Shield,
  Swords,
  Trophy,
  Flame,
  Star,
  Calendar,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Progress,
  Badge
} from "@/components/ui"
import type { BossBattle } from "@/lib/types"

interface BossBattleDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bossBattle: BossBattle
  onAbandon: (id: string) => void
}

export function BossBattleDetailsDialog({ open, onOpenChange, bossBattle, onAbandon }: BossBattleDetailsDialogProps) {
  const [abandonConfirmOpen, setAbandonConfirmOpen] = useState(false)


  const progressPercentage = Math.min(100, Math.round((bossBattle.currentProgress / bossBattle.requiredProgress) * 100))

  const isActive = bossBattle.status === "active"
  const isCompleted = bossBattle.status === "completed"


  const daysRemaining = bossBattle.deadline
    ? Math.ceil((new Date(bossBattle.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }


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


  const handleAbandon = () => {
    onAbandon(bossBattle.id)
    setAbandonConfirmOpen(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Swords className={`h-6 w-6 ${isCompleted ? "text-green-500" : "text-primary"}`} />
                {bossBattle.name}
              </DialogTitle>
              <Badge className={getDifficultyColor()}>
                {bossBattle.difficulty.charAt(0).toUpperCase() + bossBattle.difficulty.slice(1)}
              </Badge>
            </div>
            <DialogDescription className="text-base pt-2">{bossBattle.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Battle progress */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Battle Progress
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {bossBattle.currentProgress}/{bossBattle.requiredProgress} ({progressPercentage}%)
                  </span>
                </div>
                <Progress
                  value={progressPercentage}
                  className="h-3"
                  indicatorClassName={`
                    ${isCompleted ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-gradient-to-r from-primary to-primary/80"}
                  `}
                />
              </div>
            </div>

            {/* Battle dates */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Battle Timeline
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Started</div>
                  <div className="font-medium">{formatDate(bossBattle.startDate)}</div>
                </div>
                {bossBattle.deadline && (
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Deadline</div>
                    <div className={`font-medium ${daysRemaining && daysRemaining < 3 ? "text-red-500" : ""}`}>
                      {formatDate(bossBattle.deadline)}
                      {daysRemaining && daysRemaining > 0 && (
                        <span className="text-xs ml-1">({daysRemaining} days left)</span>
                      )}
                    </div>
                  </div>
                )}
                {bossBattle.completedDate && (
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Completed</div>
                    <div className="font-medium text-green-500">{formatDate(bossBattle.completedDate)}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Battle requirements */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Requirements
              </h4>
              <div className="space-y-2">
                {bossBattle.requirements.map((requirement, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center gap-3 p-3 rounded-md border
                      ${requirement.completed ? "bg-green-500/5 border-green-500/20" : "bg-muted/50"}
                    `}
                  >
                    {requirement.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                    )}
                    <div className="text-sm">{requirement.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Battle rewards */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Rewards
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {bossBattle.rewards.map((reward, index) => {
                  let icon: React.ReactNode = <Star className="h-5 w-5" />
                  let label = ""
                  let color = "text-primary"

                  if (reward.type === "coins") {
                    icon = "🪙"
                    label = `${reward.amount} Coins`
                    color = "text-yellow-500"
                  } else if (reward.type === "experience") {
                    icon = "✨"
                    label = `${reward.amount} XP`
                    color = "text-blue-500"
                  } else if (reward.type === "strength") {
                    icon = "💪"
                    label = `${reward.amount} Strength`
                    color = "text-red-500"
                  } else if (reward.type === "smart") {
                    icon = "🧠"
                    label = `${reward.amount} Smart`
                    color = "text-purple-500"
                  }

                  return (
                    <div
                      key={index}
                      className={`
                        flex items-center gap-3 p-3 rounded-md border
                        ${isCompleted ? "bg-green-500/5 border-green-500/20" : "bg-muted/50"}
                      `}
                    >
                      <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 ${color}`}>
                        {typeof icon === "string" ? icon : icon}
                      </div>
                      <div className="font-medium">{label}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            {isActive && (
              <Button variant="destructive" onClick={() => setAbandonConfirmOpen(true)}>
                Abandon Battle
                <Flame className="h-4 w-4 ml-2" />
              </Button>
            )}
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={abandonConfirmOpen} onOpenChange={setAbandonConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Abandon Boss Battle?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to abandon this boss battle? This action cannot be undone, and you'll lose all
              progress.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAbandon} className="bg-red-500 hover:bg-red-600">
              Yes, Abandon Battle
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
