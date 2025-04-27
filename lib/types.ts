export interface Habit {
  id: string
  name: string
  description: string
  frequency: "daily" | "weekly" | "monthly"
  category: string
  streak: number
  completedDates: string[] // ISO date strings (YYYY-MM-DD)
  goal: number
  archived: boolean
  streakFreezes: number
  achievements: string[]
  longestStreak: number
  level: number
  experience: number
}

export interface AvatarFeature {
  type: string
  option: string
  color?: string
}

export interface Avatar {
  faceShape: AvatarFeature
  hair: AvatarFeature
  hairColor: string
  accessories: AvatarFeature[]
  clothing: AvatarFeature
  eyes?: AvatarFeature
  mouth?: AvatarFeature
}

export interface Profile {
  name: string
  avatar: string | Avatar
  bio: string
  level: number
  experience: number
  attributes: {
    strength: number
    smart: number
  }
  coins: number
  badges: string[]
  stats: {
    habitsCompleted: number
    longestStreak: number
    coinsEarned: number
    rewardsRedeemed: number
  }
  recentActivities: Activity[]
  availableRewards: Reward[]
  rewardHistory: RewardTransaction[]
  // Additional profile maker fields
  location?: string
  website?: string
  occupation?: string
  timezone?: string
  preferences?: {
    theme?: string
    accentColor?: string
    emailNotifications?: boolean
    pushNotifications?: boolean
    profileVisibility?: string
    activityVisibility?: number
  }
  initialFocus?: string[]
  preferredCategories?: string[]
}

export interface Activity {
  type: string
  description: string
  timestamp: string
  data?: any
}

export interface Reward {
  id: string
  name: string
  description: string
  cost: number
  category: string
  image?: string
}

export interface RewardTransaction {
  id: string
  reward: Reward
  timestamp: string
}

export interface BossBattle {
  id: string
  name: string
  description: string
  difficulty: "easy" | "medium" | "hard" | "epic" | "legendary"
  status: "available" | "active" | "completed" | "abandoned"
  currentProgress: number
  requiredProgress: number
  startDate: string
  deadline?: string
  completedDate?: string
  requirements: BossBattleRequirement[]
  rewards: BossBattleReward[]
}

export interface BossBattleRequirement {
  description: string
  detail?: string
  completed: boolean
}

export interface BossBattleReward {
  type: "coins" | "strength" | "smart" | "experience"
  amount: number
}
