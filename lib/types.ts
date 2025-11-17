export interface User {
  id: string
  address: string
  username: string
  avatar?: string
  xp: number
  level: number
  joinedAt: Date
  bio?: string
  social?: {
    twitter?: string
    telegram?: string
    discord?: string
    email?: string
  }
}

export interface Quest {
  id: string
  title: string
  description: string
  category: "social" | "onchain" | "learning" | "community"
  difficulty: "beginner" | "intermediate" | "advanced"
  status: "available" | "active" | "completed"
  progress: number
  verificationType: "manual" | "automatic"
  requirements?: string[]
  steps?: QuestStep[]
  rewards: {
    xp: number
    nft?: string
  }
  deadline?: Date
  isDaily?: boolean
  isWeekly?: boolean
}

export interface QuestStep {
  id: string
  title: string
  description: string
  completed: boolean
  verificationType: "manual" | "automatic"
  verificationData?: any
}

export interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
  quiz?: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

export interface NFT {
  id: string
  name: string
  description: string
  image: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  claimable: boolean
  claimedAt?: Date
  claimPrice: number
}

export interface CommunityPost {
  id: string
  author: User
  content: string
  likes: number
  replies: number
  createdAt: Date
  tags: string[]
}

export interface UserStats {
  totalXP: number
  level: number
  questsCompleted: number
  nftsOwned: number
  communityRank: number
}
