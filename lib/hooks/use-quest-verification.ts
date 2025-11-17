"use client"

import { useState, useCallback } from "react"
import { useUserContext } from "./use-user-context"

export function useQuestVerification() {
  const { walletAddress } = useUserContext()
  const [isVerifying, setIsVerifying] = useState(false)

  const verifyOnChainQuest = useCallback(
    async (questId: string): Promise<{ success: boolean; message: string }> => {
      setIsVerifying(true)

      try {
        // Simulate on-chain verification
        await new Promise((resolve) => setTimeout(resolve, 2000))

        if (!walletAddress) {
          return { success: false, message: "Wallet not connected" }
        }

        // Mock verification logic for different quest types
        switch (questId) {
          case "onchain-1": {
            // Verify transaction was made
            const hasMadeTransaction = Math.random() > 0.3
            return {
              success: hasMadeTransaction,
              message: hasMadeTransaction
                ? "Transaction verified on Polkadot network!"
                : "No recent transactions found. Please make a transaction first.",
            }
          }
          case "onchain-2": {
            // Verify staking
            const hasStaked = Math.random() > 0.5
            return {
              success: hasStaked,
              message: hasStaked
                ? "Staking verified! You're now earning rewards."
                : "No staking detected. Please stake your DOT first.",
            }
          }
          case "onchain-3": {
            // Verify governance participation
            const hasVoted = Math.random() > 0.6
            return {
              success: hasVoted,
              message: hasVoted
                ? "Governance vote verified! Thank you for participating."
                : "No votes found. Please vote on an active referendum.",
            }
          }
          default:
            return { success: false, message: "Verification not implemented for this quest" }
        }
      } catch (error) {
        return { success: false, message: "Verification failed. Please try again." }
      } finally {
        setIsVerifying(false)
      }
    },
    [walletAddress],
  )

  const verifySocialQuest = useCallback(
    async (questId: string): Promise<{ success: boolean; message: string }> => {
      setIsVerifying(true)

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock social verification
        switch (questId) {
          case "social-1": {
            const isFollowing = Math.random() > 0.2
            return {
              success: isFollowing,
              message: isFollowing
                ? "Verified! Thanks for following us on X!"
                : "Please follow @DotWayProtocol on X and try again.",
            }
          }
          case "social-2": {
            const hasJoined = Math.random() > 0.3
            return {
              success: hasJoined,
              message: hasJoined
                ? "Welcome to the Polkadot Discord community!"
                : "Please join the Discord server and try again.",
            }
          }
          default:
            return { success: false, message: "Verification not implemented for this quest" }
        }
      } catch (error) {
        return { success: false, message: "Verification failed. Please try again." }
      } finally {
        setIsVerifying(false)
      }
    },
    [],
  )

  const verifyCommunityQuest = useCallback(
    async (questId: string): Promise<{ success: boolean; message: string }> => {
      setIsVerifying(true)

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))

        switch (questId) {
          case "community-1": {
            const hasReferred = Math.random() > 0.4
            return {
              success: hasReferred,
              message: hasReferred
                ? "Referral verified! Your friend has joined DotWay."
                : "No verified referrals yet. Share your link and try again.",
            }
          }
          default:
            return { success: false, message: "Verification not implemented for this quest" }
        }
      } catch (error) {
        return { success: false, message: "Verification failed. Please try again." }
      } finally {
        setIsVerifying(false)
      }
    },
    [],
  )

  const verifyQuest = useCallback(
    async (questId: string, category: string): Promise<{ success: boolean; message: string }> => {
      switch (category) {
        case "onchain":
          return verifyOnChainQuest(questId)
        case "social":
          return verifySocialQuest(questId)
        case "community":
          return verifyCommunityQuest(questId)
        case "learning":
          // Learning quests use manual verification
          return { success: true, message: "Manual verification completed" }
        default:
          return { success: false, message: "Unknown quest category" }
      }
    },
    [verifyOnChainQuest, verifySocialQuest, verifyCommunityQuest],
  )

  return {
    verifyQuest,
    isVerifying,
  }
}
