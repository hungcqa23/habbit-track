import { AppHeader } from "@/components/app-header"
import { ArchivedHabits } from "./components"

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <AppHeader />
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <ArchivedHabits />
      </div>
    </div>
  )
}
