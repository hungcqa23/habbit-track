import { CalendarCheck2 } from "lucide-react"

export function HabitHeader() {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="flex items-center gap-2">
        <CalendarCheck2 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">HabitTrack</h1>
      </div>
      <p className="text-muted-foreground max-w-md">
        Track your daily habits, build streaks, and achieve your goals with our simple habit tracking system.
      </p>
    </div>
  )
}
