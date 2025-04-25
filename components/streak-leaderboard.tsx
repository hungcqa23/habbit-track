import { Trophy } from "lucide-react"
import type { Habit } from "@/lib/types"
import { StreakBadge } from "@/components/streak-badge"

interface StreakLeaderboardProps {
  habits: Habit[]
  className?: string
}

export function StreakLeaderboard({ habits, className }: StreakLeaderboardProps) {
  // Sort habits by streak (descending) and take top 3
  const topHabits = [...habits]
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 3)
    .filter((habit) => habit.streak > 0)

  if (topHabits.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="h-5 w-5 text-yellow-500" />
        <h3 className="font-semibold">Top Streaks</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {topHabits.map((habit, index) => (
          <div
            key={habit.id}
            className={`
              flex items-center justify-between p-3 rounded-lg border
              ${index === 0 ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900/50" : ""}
              ${index === 1 ? "bg-slate-50 border-slate-200 dark:bg-slate-950/20 dark:border-slate-900/50" : ""}
              ${index === 2 ? "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50" : ""}
            `}
          >
            <div className="flex items-center gap-2">
              <div
                className={`
                flex items-center justify-center w-6 h-6 rounded-full text-white font-bold text-xs
                ${index === 0 ? "bg-yellow-500" : ""}
                ${index === 1 ? "bg-slate-400" : ""}
                ${index === 2 ? "bg-amber-600" : ""}
              `}
              >
                {index + 1}
              </div>
              <span className="font-medium truncate max-w-[120px]">{habit.name}</span>
            </div>
            <StreakBadge streak={habit.streak} />
          </div>
        ))}
      </div>
    </div>
  )
}
