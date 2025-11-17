"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useUserContext } from "@/lib/hooks/use-user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle } from 'lucide-react'

interface ProfileSetupModalProps {
  onComplete: () => void
  onCancel?: () => void
}

export function ProfileSetupModal({ onComplete, onCancel }: ProfileSetupModalProps) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setUser, connectWallet } = useUserContext()

  const avatarOptions = ["🤖", "🎨", "🚀", "⚡", "💎", "👨‍💻", "🌟", "🔥"]

  const handleCreateProfile = async () => {
    if (!username.trim()) return
    if (typeof window === 'undefined') return

    setIsLoading(true)
    setError(null)
    
    try {
      const address = await connectWallet()
      
      const newUser = {
        id: Math.random().toString(36).substring(7),
        address,
        username: username.trim(),
        avatar: avatarOptions[selectedAvatar],
        xp: 0,
        level: 1,
        joinedAt: new Date(),
        bio: "",
      }
      
      setUser(newUser)
      onComplete()
      
      setTimeout(() => {
        router.push("/questboard")
      }, 300)
    } catch (error) {
      console.error("Profile creation failed:", error)
      
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Failed to connect wallet. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="glass border border-primary/50 rounded-2xl p-8 max-w-md w-full animate-in fade-in zoom-in">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Create Your Profile</h2>
            <p className="text-sm text-foreground/60">Choose your username and avatar to get started</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose your username"
                className="bg-background/50 border-primary/30"
                onKeyPress={(e) => e.key === "Enter" && handleCreateProfile()}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Choose Avatar</label>
              <div className="grid grid-cols-4 gap-2">
                {avatarOptions.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAvatar(index)}
                    disabled={isLoading}
                    className={`p-3 rounded-lg text-2xl transition ${
                      selectedAvatar === index
                        ? "bg-primary/50 border-2 border-primary scale-110"
                        : "bg-background/50 border border-border hover:border-primary/50"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-background/30 border border-border/50 rounded-lg p-3 text-xs text-foreground/60">
              <p className="mb-1">📌 We'll connect your Polkadot wallet next.</p>
              <p>If you've registered before with this wallet, you'll be logged in automatically.</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            {onCancel && (
              <Button onClick={onCancel} variant="ghost" className="flex-1" disabled={isLoading}>
                Cancel
              </Button>
            )}
            <Button
              onClick={handleCreateProfile}
              disabled={!username.trim() || isLoading}
              className="flex-1 bg-gradient-to-r from-primary to-accent"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Connecting...
                </span>
              ) : (
                "Create & Connect"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
