"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useUserContext } from "@/lib/hooks/use-user-context"
import { Button } from "@/components/ui/button"
import { ProfileSetupModal } from "@/components/profile-setup-modal"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const router = useRouter()
  const { user, walletAddress, isConnecting, logout, isLoading, connectWallet } = useUserContext()

  const handleConnect = async () => {
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
      console.error("Wallet connection failed in navbar:", error)
    }
  }

  const handleDisconnect = () => {
    logout()
  }

  const handleProfileComplete = () => {
    setShowProfileModal(false)
  }

  const handleProfileCancel = () => {
    setShowProfileModal(false)
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">●</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                DotWay
              </span>
            </Link>

            <div className="hidden md:flex gap-6">
              <Link href="/questboard" className="text-sm hover:text-primary transition">
                QuestBoard
              </Link>
              <Link href="/quests" className="text-sm hover:text-primary transition">
                Quests
              </Link>
              <Link href="/profile" className="text-sm hover:text-primary transition">
                Profile
              </Link>
              <Link href="/community" className="text-sm hover:text-primary transition">
                Community
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {user && walletAddress ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-primary/30">
                    <div className="text-xl">{user.avatar}</div>
                    <div className="text-xs">
                      <div className="font-semibold text-foreground">{user.username}</div>
                      <div className="text-foreground/60">
                        {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleDisconnect}
                    variant="outline"
                    size="sm"
                    className="border-primary/30 bg-transparent"
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting || isLoading}
                  className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50"
                >
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
              ☰
            </button>
          </div>
        </div>
      </nav>

      {showProfileModal && !user && (
        <ProfileSetupModal onComplete={handleProfileComplete} onCancel={handleProfileCancel} />
      )}
    </>
  )
}
