import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Award, Coins, Dumbbell, Brain, Gift, Clock } from "lucide-react"
import type { Activity } from "@/lib/types"

interface ActivityFeedProps {
  activities: Activity[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  // Function to get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "habit_completed":
        return <Check className="h-4 w-4 text-green-500" />
      case "achievement_earned":
        return <Award className="h-4 w-4 text-purple-500" />
      case "coins_earned":
        return <Coins className="h-4 w-4 text-yellow-500" />
      case "strength_increased":
        return <Dumbbell className="h-4 w-4 text-red-500" />
      case "smart_increased":
        return <Brain className="h-4 w-4 text-blue-500" />
      case "reward_redeemed":
        return <Gift className="h-4 w-4 text-pink-500" />
      default:
        return <Check className="h-4 w-4" />
    }
  }

  // Function to get background color based on activity type
  const getActivityBg = (type: string) => {
    switch (type) {
      case "habit_completed":
        return "bg-green-100 dark:bg-green-900/30"
      case "achievement_earned":
        return "bg-purple-100 dark:bg-purple-900/30"
      case "coins_earned":
        return "bg-yellow-100 dark:bg-yellow-900/30"
      case "strength_increased":
        return "bg-red-100 dark:bg-red-900/30"
      case "smart_increased":
        return "bg-blue-100 dark:bg-blue-900/30"
      case "reward_redeemed":
        return "bg-pink-100 dark:bg-pink-900/30"
      default:
        return "bg-muted"
    }
  }

  if (activities.length === 0) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-6 text-center text-muted-foreground">No recent activity to display.</CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors">
              <div className={`mt-0.5 rounded-full p-2 ${getActivityBg(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(activity.timestamp).toLocaleString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
