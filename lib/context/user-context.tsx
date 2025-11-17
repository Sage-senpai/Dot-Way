"use client"

import { createContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { User, UserStats, Quest, NFT } from "@/lib/types"

interface UserContextType {
  user: User | null
  stats: UserStats | null
  quests: Quest[]
  nfts: NFT[]
  walletAddress: string | null
  isConnecting: boolean
  setUser: (user: User) => void
  updateUserXP: (xp: number) => void
  completeQuest: (questId: string) => void
  updateQuestProgress: (questId: string, progress: number) => void
  startQuest: (questId: string) => void
  claimNFT: (nftId: string) => void
  connectWallet: () => Promise<string>
  logout: () => void
  isLoading: boolean
  updateUserProfile: (updates: Partial<User>) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quests, setQuests] = useState<Quest[]>(mockQuests)
  const [nfts, setNFTs] = useState<NFT[]>(mockNFTs)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }

    const savedWallet = localStorage.getItem("dotway_wallet")

    if (savedWallet) {
      setWalletAddress(savedWallet)
      const profiles = JSON.parse(localStorage.getItem("dotway_profiles") || "{}")
      const savedUser = profiles[savedWallet]
      
      if (savedUser) {
        try {
          setUserState(savedUser)
        } catch (e) {
          console.error("Failed to parse saved user", e)
        }
      }
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (user && walletAddress) {
      const profiles = JSON.parse(localStorage.getItem("dotway_profiles") || "{}")
      profiles[walletAddress] = user
      localStorage.setItem("dotway_profiles", JSON.stringify(profiles))
    }
  }, [user, walletAddress])

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (walletAddress) {
      localStorage.setItem("dotway_wallet", walletAddress)
    }
  }, [walletAddress])

  const loadProfileForWallet = useCallback((address: string) => {
    if (typeof window === 'undefined') return false
    
    const profiles = JSON.parse(localStorage.getItem("dotway_profiles") || "{}")
    const existingProfile = profiles[address]
    
    if (existingProfile) {
      setUserState(existingProfile)
      return true
    }
    
    return false
  }, [])

  const connectWallet = useCallback(async (): Promise<string> => {
    setIsConnecting(true)
    
    try {
      let address = ""
      
      if (typeof window !== "undefined") {
        try {
          const { web3Accounts, web3Enable } = await import('@polkadot/extension-dapp')
          
          const extensions = await web3Enable('DotWay')
          
          if (extensions.length === 0) {
            throw new Error('No Polkadot extension found')
          }
          
          const allAccounts = await web3Accounts()
          
          if (allAccounts.length === 0) {
            throw new Error('No accounts found in wallet')
          }
          
          address = allAccounts[0].address
        } catch (extensionError: any) {
          if (extensionError?.message?.includes('origins don\'t match')) {
            address = generateMockAddress()
            console.info('Preview mode: Using mock wallet address. Real wallet will work in production.')
          } else {
            throw extensionError
          }
        }
      }
      
      setWalletAddress(address)
      loadProfileForWallet(address)
      
      return address
    } catch (error) {
      if (error instanceof Error && !error.message.includes('origins don\'t match')) {
        alert(error.message)
      }
      
      throw error
    } finally {
      setIsConnecting(false)
    }
  }, [loadProfileForWallet])

  const setUser = useCallback((newUser: User) => {
    setUserState(newUser)
  }, [])

  const updateUserXP = useCallback((xp: number) => {
    setUserState((prevUser) => {
      if (!prevUser) return prevUser
      const newXP = prevUser.xp + xp
      const newLevel = Math.floor(newXP / 1000) + 1
      return { ...prevUser, xp: newXP, level: newLevel }
    })
  }, [])

  const completeQuest = useCallback(
    (questId: string) => {
      setQuests(quests.map((q) => (q.id === questId ? { ...q, status: "completed", progress: 100 } : q)))
      const quest = quests.find((q) => q.id === questId)
      if (quest) {
        updateUserXP(quest.rewards.xp)
      }
    },
    [quests, updateUserXP],
  )

  const startQuest = useCallback(
    (questId: string) => {
      setQuests(quests.map((q) => (q.id === questId ? { ...q, status: "active" } : q)))
    },
    [quests],
  )

  const updateQuestProgress = useCallback(
    (questId: string, progress: number) => {
      setQuests(quests.map((q) => (q.id === questId ? { ...q, progress } : q)))
    },
    [quests],
  )

  const claimNFT = useCallback(
    (nftId: string) => {
      setNFTs(nfts.map((n) => (n.id === nftId ? { ...n, claimable: false, claimedAt: new Date() } : n)))
      updateUserXP(250)
    },
    [nfts, updateUserXP],
  )

  const logout = useCallback(() => {
    if (typeof window === 'undefined') return
    
    setUserState(null)
    setWalletAddress(null)
    localStorage.removeItem("dotway_wallet")
  }, [])

  const updateUserProfile = useCallback((updates: Partial<User>) => {
    setUserState((prevUser) => {
      if (!prevUser) return prevUser
      return { ...prevUser, ...updates }
    })
  }, [])

  const stats: UserStats = user
    ? {
        totalXP: user.xp,
        level: user.level,
        questsCompleted: quests.filter((q) => q.status === "completed").length,
        nftsOwned: nfts.filter((n) => n.claimedAt).length,
        communityRank: 42,
      }
    : {
        totalXP: 0,
        level: 1,
        questsCompleted: 0,
        nftsOwned: 0,
        communityRank: 0,
      }

  return (
    <UserContext.Provider
      value={{
        user,
        stats,
        quests,
        nfts,
        walletAddress,
        isConnecting,
        setUser,
        updateUserXP,
        completeQuest,
        startQuest,
        updateQuestProgress,
        claimNFT,
        connectWallet,
        logout,
        isLoading,
        updateUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const mockQuests: Quest[] = [
  // Social Quests
  {
    id: "social-1",
    title: "Follow DotWay on X",
    description: "Follow our official X (Twitter) account to stay updated",
    category: "social",
    difficulty: "beginner",
    status: "available",
    progress: 0,
    verificationType: "automatic",
    requirements: ["Have an X (Twitter) account"],
    rewards: { xp: 100 },
  },
  {
    id: "social-2",
    title: "Join Polkadot Discord",
    description: "Join the official Polkadot Discord community",
    category: "social",
    difficulty: "beginner",
    status: "available",
    progress: 0,
    verificationType: "automatic",
    requirements: ["Have a Discord account"],
    rewards: { xp: 150 },
  },
  {
    id: "social-3",
    title: "Share Your Journey",
    description: "Share your DotWay progress on social media with #DotWayQuest",
    category: "social",
    difficulty: "beginner",
    status: "available",
    progress: 0,
    verificationType: "manual",
    requirements: ["Complete at least 1 quest"],
    rewards: { xp: 200 },
  },
  // On-chain Quests
  {
    id: "onchain-1",
    title: "Make Your First Transaction",
    description: "Send DOT to another address on the Polkadot network",
    category: "onchain",
    difficulty: "beginner",
    status: "available",
    progress: 0,
    verificationType: "automatic",
    requirements: ["Connected wallet with DOT balance"],
    rewards: { xp: 500 },
  },
  {
    id: "onchain-2",
    title: "Stake Your DOT",
    description: "Nominate validators and start earning staking rewards",
    category: "onchain",
    difficulty: "intermediate",
    status: "available",
    progress: 0,
    verificationType: "automatic",
    requirements: ["Minimum 10 DOT in wallet"],
    rewards: { xp: 1000 },
  },
  {
    id: "onchain-3",
    title: "Participate in Governance",
    description: "Vote on an active referendum in Polkadot OpenGov",
    category: "onchain",
    difficulty: "advanced",
    status: "available",
    progress: 0,
    verificationType: "automatic",
    requirements: ["Understanding of governance", "DOT locked for voting"],
    rewards: { xp: 1500 },
  },
  // Learning Quests
  {
    id: "learning-1",
    title: "Welcome to Polkadot",
    description: "Learn the fundamentals of the Polkadot ecosystem",
    category: "learning",
    difficulty: "beginner",
    status: "available",
    progress: 0,
    verificationType: "manual",
    rewards: { xp: 300 },
  },
  {
    id: "learning-2",
    title: "Understanding Parachains",
    description: "Deep dive into parachain technology and architecture",
    category: "learning",
    difficulty: "intermediate",
    status: "available",
    progress: 0,
    verificationType: "manual",
    rewards: { xp: 500 },
  },
  {
    id: "learning-3",
    title: "Smart Contract Development",
    description: "Learn to build smart contracts with ink! on Polkadot",
    category: "learning",
    difficulty: "advanced",
    status: "available",
    progress: 0,
    verificationType: "manual",
    rewards: { xp: 1000 },
  },
  // Community Quests
  {
    id: "community-1",
    title: "Refer a Friend",
    description: "Invite a friend to join DotWay using your referral link",
    category: "community",
    difficulty: "beginner",
    status: "available",
    progress: 0,
    verificationType: "automatic",
    rewards: { xp: 250 },
  },
  {
    id: "community-2",
    title: "Answer Community Questions",
    description: "Help 5 new users in the DotWay community forum",
    category: "community",
    difficulty: "intermediate",
    status: "available",
    progress: 0,
    verificationType: "manual",
    requirements: ["Active community member"],
    rewards: { xp: 500 },
  },
  {
    id: "community-3",
    title: "Create Educational Content",
    description: "Write a guide or create a video tutorial about Polkadot",
    category: "community",
    difficulty: "advanced",
    status: "available",
    progress: 0,
    verificationType: "manual",
    requirements: ["Complete 5+ quests"],
    rewards: { xp: 2000, nft: "content-creator-badge" },
  },
]

const mockNFTs: NFT[] = [
  {
    id: "nft-1",
    name: "Genesis Explorer",
    description: "Awarded to early DotWay adopters",
    image: "/polkadot-genesis-nft.jpg",
    rarity: "legendary",
    claimable: true,
    claimPrice: 0,
  },
  {
    id: "nft-2",
    name: "Learning Enthusiast",
    description: "Completed your first learning module",
    image: "/polkadot-learning-badge.jpg",
    rarity: "uncommon",
    claimable: false,
    claimedAt: new Date(),
    claimPrice: 0,
  },
  {
    id: "nft-3",
    name: "Community Champion",
    description: "Top community contributor",
    image: "/polkadot-community-medal.jpg",
    rarity: "epic",
    claimable: true,
    claimPrice: 5000,
  },
]

// Helper function to generate consistent mock addresses
function generateMockAddress(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000000)
  const seed = `${timestamp}${random}`
  
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  let address = '1'
  
  for (let i = 0; i < 47; i++) {
    const index = (seed.charCodeAt(i % seed.length) + i) % chars.length
    address += chars[index]
  }
  
  return address
}
