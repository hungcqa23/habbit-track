import { AppHeader } from "@/components/app-header"
import { CalendarView } from "@/components/calendar-view"

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <AppHeader />
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <CalendarView />
      </div>
    </div>
  )
}
