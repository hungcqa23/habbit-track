import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"

interface LevelProgressProps {
  level: number
  currentXP: number
  nextLevelXP: number
}

export function LevelProgress({ level, currentXP, nextLevelXP }: LevelProgressProps) {
  const progressPercentage = Math.min(100, Math.round((currentXP / nextLevelXP) * 100))
  const xpRemaining = nextLevelXP - currentXP

  return (
    <Card className="border-none shadow-md overflow-hidden">

      <CardContent className="p-4 relative">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md">
              {level}
            </div>
            <div>
              <div className="font-semibold flex items-center gap-1.5">
                Level {level}
                <Sparkles className="h-4 w-4 text-primary ml-1" />
              </div>
              <div className="text-xs text-muted-foreground">Experience points</div>
            </div>
          </div>
          <span className="text-sm font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            {currentXP} / {nextLevelXP} XP
          </span>
        </div>
        <Progress
          value={progressPercentage}
          className="h-2.5 rounded-full"
          indicatorClassName="bg-gradient-to-r from-primary to-primary/80"
        />
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-muted-foreground">Current level</div>
          <div className="text-xs font-medium">
            {xpRemaining} XP needed for Level {level + 1}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
