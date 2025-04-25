import { AppHeader } from "@/components/app-header"
import { HabitDashboard } from "@/components/habit-dashboard"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <AppHeader />
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <HabitDashboard />
      </div>
    </div>
  )
}
