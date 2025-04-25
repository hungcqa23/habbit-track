"use client"
import { AppHeader } from "@/components/app-header"
import { RewardsCatalog, RewardHistory } from "./components"
import { Tabs, TabsContent, TabsList, TabsTrigger, Card, CardContent } from "@/components/ui"
import { useProfile } from "@/lib/hooks/use-profile"
import { Coins, Gift, Receipt } from "lucide-react"

export default function RewardsPage() {
  const { profile, redeemReward } = useProfile()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <AppHeader />
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="bg-primary/10 p-1.5 rounded-md">
              <Gift className="h-6 w-6 text-primary" />
            </span>
            Rewards Shop
          </h1>
          <Card className="bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border-yellow-500/30 shadow-md">
            <CardContent className="flex items-center gap-2 p-3">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-bold">{profile.coins} coins available</span>
            </CardContent>
          </Card>
        </div>

        <p className="text-muted-foreground mb-8 max-w-3xl">
          Exchange your hard-earned coins for rewards. Complete habits and achieve streaks to earn more coins! Use your
          attributes to unlock special rewards and boost your productivity.
        </p>

        <Tabs defaultValue="catalog">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Rewards Catalog
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Redemption History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog">
            <RewardsCatalog rewards={profile.availableRewards} coins={profile.coins} onRedeem={redeemReward} />
          </TabsContent>

          <TabsContent value="history">
            <RewardHistory history={profile.rewardHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
