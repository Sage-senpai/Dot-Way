"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { useUserContext } from "@/lib/hooks/use-user-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { WalletAssets } from "@/components/profile/wallet-assets"
import { ArrowLeft } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { user, updateUserProfile, isLoading } = useUserContext()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    bio: "",
    twitter: "",
    telegram: "",
    discord: "",
    email: "",
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      setFormData({
        bio: user.bio || "",
        twitter: user.social?.twitter || "",
        telegram: user.social?.telegram || "",
        discord: user.social?.discord || "",
        email: user.social?.email || "",
      })
    }
  }, [user])

  const handleSave = () => {
    updateUserProfile({
      bio: formData.bio,
      social: {
        twitter: formData.twitter,
        telegram: formData.telegram,
        discord: formData.discord,
        email: formData.email,
      },
    })
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => {
          if (typeof window !== 'undefined') router.back()
        }} variant="ghost" className="mb-4 text-foreground/60 hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-foreground/60">Manage your profile and social links</p>
        </div>

        <div className="grid gap-6">
          {/* Profile Info Card */}
          <Card className="glass border-border/40 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">{user.avatar}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{user.username}</h2>
                <p className="text-sm text-foreground/60">
                  Level {user.level} • {user.xp} XP
                </p>
                <p className="text-xs text-foreground/40 mt-1">Joined {new Date(user.joinedAt).toLocaleDateString()}</p>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
                className={
                  isEditing
                    ? "border-primary/30"
                    : "bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50"
                }
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            {/* Bio Section */}
            <div className="mb-6">
              <Label htmlFor="bio" className="text-sm font-semibold text-foreground mb-2 block">
                Bio
              </Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full bg-background/50 border-border/40 text-foreground"
                />
              ) : (
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {user.bio || "No bio added yet. Click 'Edit Profile' to add one!"}
                </p>
              )}
            </div>

            {/* Social Links Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">Social Links</h3>

              <div className="grid gap-4">
                {/* Twitter/X */}
                <div>
                  <Label htmlFor="twitter" className="text-sm text-foreground/80 mb-1 block flex items-center gap-2">
                    <span className="text-lg">𝕏</span> X (Twitter)
                  </Label>
                  {isEditing ? (
                    <Input
                      id="twitter"
                      type="text"
                      value={formData.twitter}
                      onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                      placeholder="@username"
                      className="bg-background/50 border-border/40 text-foreground"
                    />
                  ) : (
                    <p className="text-sm text-foreground/60">{user.social?.twitter || "Not connected"}</p>
                  )}
                </div>

                {/* Telegram */}
                <div>
                  <Label htmlFor="telegram" className="text-sm text-foreground/80 mb-1 block flex items-center gap-2">
                    <span className="text-lg">✈️</span> Telegram
                  </Label>
                  {isEditing ? (
                    <Input
                      id="telegram"
                      type="text"
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      placeholder="@username"
                      className="bg-background/50 border-border/40 text-foreground"
                    />
                  ) : (
                    <p className="text-sm text-foreground/60">{user.social?.telegram || "Not connected"}</p>
                  )}
                </div>

                {/* Discord */}
                <div>
                  <Label htmlFor="discord" className="text-sm text-foreground/80 mb-1 block flex items-center gap-2">
                    <span className="text-lg">💬</span> Discord
                  </Label>
                  {isEditing ? (
                    <Input
                      id="discord"
                      type="text"
                      value={formData.discord}
                      onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                      placeholder="username#1234"
                      className="bg-background/50 border-border/40 text-foreground"
                    />
                  ) : (
                    <p className="text-sm text-foreground/60">{user.social?.discord || "Not connected"}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-sm text-foreground/80 mb-1 block flex items-center gap-2">
                    <span className="text-lg">📧</span> Email
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-background/50 border-border/40 text-foreground"
                    />
                  ) : (
                    <p className="text-sm text-foreground/60">{user.social?.email || "Not connected"}</p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </Card>

          {/* Wallet Assets Card */}
          <WalletAssets address={user.address} />

          {/* Wallet Info Card */}
          <Card className="glass border-border/40 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Wallet Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/60">Connected Address</span>
                <span className="text-sm font-mono text-foreground">
                  {user.address.slice(0, 10)}...{user.address.slice(-8)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/60">Account Type</span>
                <span className="text-sm text-foreground">Polkadot</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
