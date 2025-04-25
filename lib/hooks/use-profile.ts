"use client"

import { useState, useEffect } from "react"
import type { Profile, RewardTransaction } from "@/lib/types"

// Sample profile data
const initialProfile: Profile = {
  name: "Alex Johnson",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Habit enthusiast focused on self-improvement and productivity",
  level: 5,
  experience: 450,
  attributes: {
    strength: 65,
    smart: 78,
  },
  coins: 350,
  badges: ["Habit Master", "Early Adopter"],
  stats: {
    habitsCompleted: 124,
    longestStreak: 21,
    coinsEarned: 520,
    rewardsRedeemed: 3,
  },
  recentActivities: [
    {
      type: "habit_completed",
      description: "Completed habit: Exercise",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      type: "coins_earned",
      description: "Earned 15 coins for completing daily habits",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      type: "strength_increased",
      description: "Strength increased to 65",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      type: "achievement_earned",
      description: "Achievement unlocked: 21 Day Habit",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      type: "reward_redeemed",
      description: "Redeemed reward: 1 Hour Gaming Time",
      timestamp: new Date(Date.now() - 259200000).toISOString(),
    },
  ],
  availableRewards: [
    {
      id: "1",
      name: "1 Hour Gaming Time",
      description: "Enjoy an hour of your favorite video games",
      cost: 50,
      category: "entertainment",
    },
    {
      id: "2",
      name: "Music Streaming (2 hours)",
      description: "Listen to your favorite music for 2 hours",
      cost: 30,
      category: "music",
    },
    {
      id: "3",
      name: "Movie Night",
      description: "Watch a movie of your choice",
      cost: 80,
      category: "movie",
    },
    {
      id: "4",
      name: "Coffee Break",
      description: "Enjoy a coffee or tea break",
      cost: 25,
      category: "food",
    },
    {
      id: "5",
      name: "Reading Time (1 hour)",
      description: "Spend an hour reading your favorite book",
      cost: 40,
      category: "reading",
    },
    {
      id: "6",
      name: "Online Shopping Spree",
      description: "Treat yourself to something nice online",
      cost: 200,
      category: "shopping",
    },
  ],
  rewardHistory: [
    {
      id: "tx1",
      reward: {
        id: "1",
        name: "1 Hour Gaming Time",
        description: "Enjoy an hour of your favorite video games",
        cost: 50,
        category: "entertainment",
      },
      timestamp: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: "tx2",
      reward: {
        id: "2",
        name: "Music Streaming (2 hours)",
        description: "Listen to your favorite music for 2 hours",
        cost: 30,
        category: "music",
      },
      timestamp: new Date(Date.now() - 604800000).toISOString(),
    },
    {
      id: "tx3",
      reward: {
        id: "4",
        name: "Coffee Break",
        description: "Enjoy a coffee or tea break",
        cost: 25,
        category: "food",
      },
      timestamp: new Date(Date.now() - 1209600000).toISOString(),
    },
  ],
  // Additional profile maker fields
  location: "San Francisco, CA",
  website: "https://alexjohnson.dev",
  occupation: "Software Developer",
  timezone: "UTC-8",
  preferences: {
    theme: "system",
    accentColor: "default",
    emailNotifications: true,
    pushNotifications: false,
    profileVisibility: "public",
    activityVisibility: 70,
  },
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(initialProfile)

  // Load profile from localStorage on initial render
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile")
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile))
  }, [profile])

  // Update the entire profile
  const updateProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile)
  }

  // Redeem a reward
  const redeemReward = (rewardId: string) => {
    const reward = profile.availableRewards.find((r) => r.id === rewardId)

    if (!reward || profile.coins < reward.cost) {
      return false
    }

    const transaction: RewardTransaction = {
      id: `tx${Date.now()}`,
      reward,
      timestamp: new Date().toISOString(),
    }

    setProfile({
      ...profile,
      coins: profile.coins - reward.cost,
      rewardHistory: [transaction, ...profile.rewardHistory],
      stats: {
        ...profile.stats,
        rewardsRedeemed: profile.stats.rewardsRedeemed + 1,
      },
      recentActivities: [
        {
          type: "reward_redeemed",
          description: `Redeemed reward: ${reward.name}`,
          timestamp: new Date().toISOString(),
        },
        ...profile.recentActivities,
      ],
    })

    return true
  }

  // Add coins to profile
  const addCoins = (amount: number) => {
    setProfile({
      ...profile,
      coins: profile.coins + amount,
      stats: {
        ...profile.stats,
        coinsEarned: profile.stats.coinsEarned + amount,
      },
      recentActivities: [
        {
          type: "coins_earned",
          description: `Earned ${amount} coins`,
          timestamp: new Date().toISOString(),
        },
        ...profile.recentActivities,
      ],
    })
  }

  // Increase attribute
  const increaseAttribute = (attribute: "strength" | "smart", amount: number) => {
    setProfile({
      ...profile,
      attributes: {
        ...profile.attributes,
        [attribute]: Math.min(100, profile.attributes[attribute] + amount),
      },
      recentActivities: [
        {
          type: `${attribute}_increased`,
          description: `${attribute.charAt(0).toUpperCase() + attribute.slice(1)} increased by ${amount}`,
          timestamp: new Date().toISOString(),
        },
        ...profile.recentActivities,
      ],
    })
  }

  return {
    profile,
    updateProfile,
    redeemReward,
    addCoins,
    increaseAttribute,
  }
}
