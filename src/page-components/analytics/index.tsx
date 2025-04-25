import { AppHeader } from "@/components/app-header"
import { AnalyticsDashboard } from "./components"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <AppHeader />
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <AnalyticsDashboard />
      </div>
    </div>
  )
}
