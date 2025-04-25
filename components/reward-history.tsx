import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Music, Gamepad2, Coffee, Film, Book, Gift, ShoppingBag, Clock, Receipt } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { RewardTransaction } from "@/lib/types"

interface RewardHistoryProps {
  history: RewardTransaction[]
}

export function RewardHistory({ history }: RewardHistoryProps) {
  // Function to get icon based on reward category
  const getRewardIcon = (category: string) => {
    switch (category) {
      case "entertainment":
        return <Gamepad2 className="h-5 w-5 text-indigo-500" />
      case "music":
        return <Music className="h-5 w-5 text-blue-500" />
      case "food":
        return <Coffee className="h-5 w-5 text-amber-500" />
      case "movie":
        return <Film className="h-5 w-5 text-red-500" />
      case "reading":
        return <Book className="h-5 w-5 text-green-500" />
      case "shopping":
        return <ShoppingBag className="h-5 w-5 text-pink-500" />
      default:
        return <Gift className="h-5 w-5 text-purple-500" />
    }
  }

  // Function to get background color based on reward category
  const getRewardBg = (category: string) => {
    switch (category) {
      case "entertainment":
        return "bg-indigo-100 dark:bg-indigo-900/30"
      case "music":
        return "bg-blue-100 dark:bg-blue-900/30"
      case "food":
        return "bg-amber-100 dark:bg-amber-900/30"
      case "movie":
        return "bg-red-100 dark:bg-red-900/30"
      case "reading":
        return "bg-green-100 dark:bg-green-900/30"
      case "shopping":
        return "bg-pink-100 dark:bg-pink-900/30"
      default:
        return "bg-purple-100 dark:bg-purple-900/30"
    }
  }

  if (history.length === 0) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-6 text-center text-muted-foreground">
          You haven't redeemed any rewards yet.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Receipt className="h-4 w-4 text-primary" />
          Redemption History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {history.map((transaction, index) => (
            <div key={index} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
              <div className={`mt-0.5 rounded-full p-2 ${getRewardBg(transaction.reward.category)}`}>
                {getRewardIcon(transaction.reward.category)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">{transaction.reward.name}</p>
                  <Badge variant="outline" className="flex items-center gap-1 bg-card/80">
                    <Coins className="h-3.5 w-3.5 text-yellow-500" />
                    <span>{transaction.reward.cost}</span>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{transaction.reward.description}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(transaction.timestamp).toLocaleDateString(undefined, {
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
