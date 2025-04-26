"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { ProfileCard, AttributesSection, ActivityFeed, LevelProgress } from "./index"
import { LayoutGrid, BarChart2 } from "lucide-react"
import { useProfileContent } from "../hooks"
import { Settings } from "@/components/icons"

export function ProfileContent() {
  const { profile } = useProfileContent()

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <span className="bg-primary/10 p-1.5 rounded-md">
          <Settings className="text-primary" />
        </span>
        Your Profile
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <ProfileCard profile={profile} />
        </div>

        <div className="md:col-span-2 space-y-6">
          <LevelProgress
            level={profile.level}
            currentXP={profile.experience}
            nextLevelXP={(profile.level + 1) * 100}
          />

          <AttributesSection
            strength={profile.attributes.strength}
            smart={profile.attributes.smart}
            coins={profile.coins}
          />

          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                Recent Activity
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                Statistics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-0">
              <ActivityFeed activities={profile.recentActivities} />
            </TabsContent>

            <TabsContent value="stats" className="mt-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-card rounded-lg border p-4 shadow-sm">
                  <h3 className="font-medium mb-2 text-sm text-muted-foreground">Habit Completion</h3>
                  <div className="text-3xl font-bold">{profile.stats.habitsCompleted}</div>
                  <p className="text-sm text-muted-foreground mt-1">Total habits completed</p>
                </div>

                <div className="bg-card rounded-lg border p-4 shadow-sm">
                  <h3 className="font-medium mb-2 text-sm text-muted-foreground">Longest Streak</h3>
                  <div className="text-3xl font-bold">{profile.stats.longestStreak}</div>
                  <p className="text-sm text-muted-foreground mt-1">Days in a row</p>
                </div>

                <div className="bg-card rounded-lg border p-4 shadow-sm">
                  <h3 className="font-medium mb-2 text-sm text-muted-foreground">Coins Earned</h3>
                  <div className="text-3xl font-bold">{profile.stats.coinsEarned}</div>
                  <p className="text-sm text-muted-foreground mt-1">Total coins earned</p>
                </div>

                <div className="bg-card rounded-lg border p-4 shadow-sm">
                  <h3 className="font-medium mb-2 text-sm text-muted-foreground">Rewards Redeemed</h3>
                  <div className="text-3xl font-bold">{profile.stats.rewardsRedeemed}</div>
                  <p className="text-sm text-muted-foreground mt-1">Total rewards claimed</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
