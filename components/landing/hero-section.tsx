"use client"

import { useState } from "react"
import { useUserContext } from "@/lib/hooks/use-user-context"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { ProfileSetupModal } from "@/components/profile-setup-modal"

export function HeroSection() {
  const router = useRouter()
  const [showProfileModal, setShowProfileModal] = useState(false)
  const { user, walletAddress, isConnecting, isLoading, connectWallet } = useUserContext()

  const handleGetStarted = async () => {
    if (typeof window === 'undefined') return
    
    if (user) {
      router.push("/questboard")
      return
    }
    
    try {
      await connectWallet()
      
      setTimeout(() => {
        if (typeof window === 'undefined') return
        
        const hasProfile = localStorage.getItem("dotway_profiles")
        if (hasProfile) {
          const profiles = JSON.parse(hasProfile)
          const currentWallet = localStorage.getItem("dotway_wallet")
          if (currentWallet && profiles[currentWallet]) {
            router.push("/questboard")
            return
          }
        }
        setShowProfileModal(true)
      }, 500)
    } catch (error) {
      console.error("Wallet connection failed:", error)
    }
  }

  const handleLogin = async () => {
    await handleGetStarted()
  }

  const handleProfileComplete = () => {
    setShowProfileModal(false)
  }

  const handleProfileCancel = () => {
    setShowProfileModal(false)
  }

  return (
    <>
      <section className="min-h-screen pt-24 pb-16 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center space-y-8 mb-16">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full glass text-sm border border-primary/50 text-primary">
                Welcome to the Polkadot Ecosystem
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block text-balance">Learn, Quest, and Explore</span>
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Polkadot
              </span>
            </h1>

            <p className="text-xl text-foreground/70 text-balance max-w-2xl mx-auto">
              Master blockchain technology through gamified quests, claim exclusive NFTs, and join a thriving
              community of developers and innovators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGetStarted}
                disabled={isConnecting || isLoading}
                className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50"
              >
                {isConnecting ? "Connecting..." : isLoading ? "Loading..." : user ? "Enter QuestBoard" : "Get Started"}
              </Button>
              <Button
                onClick={handleLogin}
                disabled={isConnecting || isLoading}
                variant="outline"
                className="px-8 py-6 text-lg border-primary/50 hover:bg-primary/10 bg-transparent"
              >
                {isConnecting ? "Connecting..." : isLoading ? "Loading..." : user ? "QuestBoard" : "Login"}
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20">
            {[
              { icon: "🎯", title: "Complete Quests", desc: "50+ quests covering Social, On-Chain, Learning, and Community challenges" },
              { icon: "🎮", title: "Gamified", desc: "Earn XP, unlock levels, and compete on leaderboards" },
              { icon: "🎨", title: "NFT Rewards", desc: "Claim exclusive digital collectibles for achievements" },
            ].map((item, i) => (
              <div
                key={i}
                className="glass p-6 rounded-xl border border-border/40 hover:border-primary/40 transition group"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showProfileModal && !user && (
        <ProfileSetupModal onComplete={handleProfileComplete} onCancel={handleProfileCancel} />
      )}
    </>
  )
}
