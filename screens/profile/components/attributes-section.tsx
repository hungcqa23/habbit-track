import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dumbbell, Brain, Coins } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Shield } from "@/components/icons"

interface AttributesSectionProps {
  strength: number
  smart: number
  coins: number
}

export function AttributesSection({ strength, smart, coins }: AttributesSectionProps) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <span className="bg-primary/10 p-1 rounded-md">
            <Shield className="w-5 h-5 text-primary" />
          </span>
          Attributes
        </CardTitle>
        <CardDescription>Your character's abilities and resources</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        <TooltipProvider>
          <div className="space-y-2.5 bg-card p-4 rounded-lg border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 p-2.5 rounded-full shadow-sm">
                  <Dumbbell className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-1.5">
                    Strength <span className="text-lg">💪</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Physical power and endurance</div>
                </div>
              </div>
              <div className="text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-full">
                {strength}/100
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="pt-1">
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-300 rounded-full"
                      style={{ width: `${strength}%` }}
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-card border shadow-md">
                <div className="text-sm font-medium mb-1">Strength: {strength}/100</div>
                <p className="text-xs text-muted-foreground">Increased by completing physical habits</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="space-y-2.5 bg-card p-4 rounded-lg border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 p-2.5 rounded-full shadow-sm">
                  <Brain className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-1.5">
                    Smart <span className="text-lg">🧠</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Mental acuity and knowledge</div>
                </div>
              </div>
              <div className="text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full">
                {smart}/100
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="pt-1">
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
                      style={{ width: `${smart}%` }}
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-card border shadow-md">
                <div className="text-sm font-medium mb-1">Smart: {smart}/100</div>
                <p className="text-xs text-muted-foreground">Increased by completing mental habits</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="space-y-2.5 bg-card p-4 rounded-lg border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 p-2.5 rounded-full shadow-sm">
                  <Coins className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-1.5">
                    Coins <span className="text-lg">💰</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Currency for rewards</div>
                </div>
              </div>
              <div className="text-sm font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2.5 py-1 rounded-full">
                {coins}
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="pt-1">
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"
                      style={{ width: `${Math.min(coins / 10, 100)}%` }}
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-card border shadow-md">
                <div className="text-sm font-medium mb-1">Coins: {coins}</div>
                <p className="text-xs text-muted-foreground">Earn by completing daily tasks and achieving streaks</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
