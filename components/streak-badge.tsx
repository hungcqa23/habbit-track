import { cn } from "@/lib/utils"

interface StreakBadgeProps {
  streak: number
  className?: string
}

export function StreakBadge({ streak, className }: StreakBadgeProps) {
  // Determine badge style based on streak length
  const getBadgeStyle = () => {
    if (streak >= 365) return "bg-gradient-to-r from-purple-500 to-pink-500 border-purple-600 text-white"
    if (streak >= 180) return "bg-gradient-to-r from-indigo-500 to-blue-500 border-indigo-600 text-white"
    if (streak >= 100) return "bg-gradient-to-r from-blue-500 to-teal-500 border-blue-600 text-white"
    if (streak >= 60) return "bg-gradient-to-r from-teal-500 to-emerald-500 border-teal-600 text-white"
    if (streak >= 30) return "bg-gradient-to-r from-emerald-500 to-green-500 border-emerald-600 text-white"
    if (streak >= 21) return "bg-gradient-to-r from-green-500 to-lime-500 border-green-600 text-white"
    if (streak >= 14) return "bg-gradient-to-r from-amber-500 to-yellow-500 border-amber-600 text-white"
    if (streak >= 7) return "bg-gradient-to-r from-orange-500 to-amber-500 border-orange-600 text-white"
    if (streak > 0) return "bg-primary/10 text-primary"
    return "bg-muted text-muted-foreground"
  }

  return (
    <div className={cn("rounded-full px-2 py-0.5 text-sm font-medium border", getBadgeStyle(), className)}>
      {streak} {streak === 1 ? "day" : "days"}
    </div>
  )
}
