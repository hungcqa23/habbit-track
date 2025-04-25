"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, Music, Gamepad2, Coffee, Film, Book, Gift, ShoppingBag, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Reward } from "@/lib/types"

interface RewardsCatalogProps {
  rewards: Reward[]
  coins: number
  onRedeem: (rewardId: string) => void
}

export function RewardsCatalog({ rewards, coins, onRedeem }: RewardsCatalogProps) {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

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

  // Function to get gradient based on reward category
  const getRewardGradient = (category: string) => {
    switch (category) {
      case "entertainment":
        return "from-indigo-500/20 to-indigo-500/5"
      case "music":
        return "from-blue-500/20 to-blue-500/5"
      case "food":
        return "from-amber-500/20 to-amber-500/5"
      case "movie":
        return "from-red-500/20 to-red-500/5"
      case "reading":
        return "from-green-500/20 to-green-500/5"
      case "shopping":
        return "from-pink-500/20 to-pink-500/5"
      default:
        return "from-purple-500/20 to-purple-500/5"
    }
  }

  const handleRedeemClick = (reward: Reward) => {
    setSelectedReward(reward)
    setConfirmDialogOpen(true)
  }

  const handleConfirmRedeem = () => {
    if (selectedReward) {
      onRedeem(selectedReward.id)
      setConfirmDialogOpen(false)
    }
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => {
          const canAfford = coins >= reward.cost
          const gradient = getRewardGradient(reward.category)

          return (
            <Card
              key={reward.id}
              className={`
                overflow-hidden transition-all border-none shadow-md
                ${canAfford ? "hover:shadow-lg" : "opacity-70"}
              `}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`}></div>
              <CardHeader className="pb-2 relative">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-card shadow-sm">{getRewardIcon(reward.category)}</div>
                    <CardTitle className="text-base">{reward.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1 bg-card/80 backdrop-blur-sm">
                    <Coins className="h-3.5 w-3.5 text-yellow-500" />
                    <span className="font-semibold">{reward.cost}</span>
                  </Badge>
                </div>
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="h-28 rounded-md flex items-center justify-center bg-card/80 backdrop-blur-sm border border-border/50">
                  <div className="text-4xl">
                    {reward.category === "entertainment"
                      ? "🎮"
                      : reward.category === "music"
                        ? "🎵"
                        : reward.category === "food"
                          ? "☕"
                          : reward.category === "movie"
                            ? "🎬"
                            : reward.category === "reading"
                              ? "📚"
                              : reward.category === "shopping"
                                ? "🛍️"
                                : "🎁"}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="relative">
                <Button
                  className={`
                    w-full gap-2 transition-all
                    ${canAfford ? "bg-primary hover:bg-primary/90" : "bg-muted text-muted-foreground"}
                  `}
                  disabled={!canAfford}
                  onClick={() => handleRedeemClick(reward)}
                >
                  {canAfford ? (
                    <>
                      <Coins className="h-4 w-4" />
                      Redeem Reward
                    </>
                  ) : (
                    <>
                      <Coins className="h-4 w-4" />
                      Not Enough Coins
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Redemption</DialogTitle>
            <DialogDescription>
              Are you sure you want to redeem this reward? This will deduct {selectedReward?.cost} coins from your
              balance.
            </DialogDescription>
          </DialogHeader>

          {selectedReward && (
            <div className="flex items-center gap-4 py-4 px-1">
              <div className={`p-3 rounded-full ${getRewardGradient(selectedReward.category).split(" ")[0]}`}>
                {getRewardIcon(selectedReward.category)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{selectedReward.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedReward.description}</p>
                <div className="flex items-center gap-1 mt-1 text-yellow-500 text-sm">
                  <Coins className="h-3.5 w-3.5" />
                  <span>{selectedReward.cost} coins</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmRedeem} className="gap-2">
              <Check className="h-4 w-4" />
              Confirm Redemption
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
