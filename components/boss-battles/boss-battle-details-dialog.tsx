"use client"

import { useState } from "react"
import {
  Shield,
  Swords,
  Trophy,
  Flame,
  Timer,
  Star,
  Calendar,
  CheckCircle2,
  XCircle,
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

  // Calculate progress percentage
  const progressPercentage = Math.min(100, Math.round((bossBattle.currentProgress / bossBattle.requiredProgress) * 100))

  // Determine if the battle is active (accepted but not completed)
  const isActive = bossBattle.status === "active"

  // Determine if the battle is completed
  const isCompleted = bossBattle.status === "completed"

  // Determine if the battle is failed/abandoned
  const isAbandoned = bossBattle.status === "abandoned"

  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

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
        return "text-yellow-500 bg-yellow-500/10"
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

  const handleAbandonConfirm = () => {
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

            {/* Battle details */}
            <div className="space-y-3">
              <h4 className="font-semibold">Battle Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Start Date</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{formatDate(bossBattle.startDate)}</span>
                  </div>
                </div>

                {bossBattle.deadline && (
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Deadline</div>
                    <div className="flex items-center gap-2">
                      <Timer
                        className={`h-4 w-4 ${daysRemaining && daysRemaining < 3 ? "text-red-500" : "text-primary"}`}
                      />
                      <span>{formatDate(bossBattle.deadline)}</span>
                      {daysRemaining !== null && (
                        <span className={`text-xs ${daysRemaining < 3 ? "text-red-500" : "text-muted-foreground"}`}>
                          ({daysRemaining} days left)
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="flex items-center gap-2">
                    {isActive && <CheckCircle2 className="h-4 w-4 text-blue-500" />}
                    {isCompleted && <Trophy className="h-4 w-4 text-green-500" />}
                    {isAbandoned && <XCircle className="h-4 w-4 text-red-500" />}
                    <span>
                      {isActive && "In Progress"}
                      {isCompleted && "Completed"}
                      {isAbandoned && "Abandoned"}
                    </span>
                  </div>
                </div>

                {bossBattle.completedDate && (
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Completed On</div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-green-500" />
                      <span>{formatDate(bossBattle.completedDate)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tasks/Requirements */}
            <div className="space-y-3">
              <h4 className="font-semibold">Battle Requirements</h4>
              <div className="space-y-2">
                {bossBattle.requirements.map((req, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-start gap-2 p-3 rounded-md border
                      ${req.completed ? "bg-green-500/5 border-green-500/20" : "bg-muted/50"}
                    `}
                  >
                    {req.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground mt-0.5" />
                    )}
                    <div>
                      <div className="font-medium">{req.description}</div>
                      {req.detail && <div className="text-sm text-muted-foreground">{req.detail}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards section */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Battle Rewards
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {bossBattle.rewards.map((reward, index) => {
                  let icon, color, label

                  if (reward.type === "coins") {
                    icon = "💰"
                    color = "text-yellow-500"
                    label = `${reward.amount} coins`
                  } else if (reward.type === "strength") {
                    icon = "💪"
                    color = "text-red-500"
                    label = `+${reward.amount} strength`
                  } else if (reward.type === "smart") {
                    icon = "🧠"
                    color = "text-blue-500"
                    label = `+${reward.amount} smart`
                  } else if (reward.type === "experience") {
                    icon = <Star className="h-4 w-4 text-purple-500" />
                    color = "text-purple-500"
                    label = `${reward.amount} XP`
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
              Are you sure you want to abandon this boss battle? Your progress will be lost and you'll need to start
              over if you want to attempt it again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAbandonConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Abandon Battle
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
