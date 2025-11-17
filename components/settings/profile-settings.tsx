"use client"

import { useUserContext } from "@/lib/hooks/use-user-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ProfileSettings() {
  const { user, setUser } = useUserContext()
  const [bio, setBio] = useState(user?.bio || "")

  if (!user) return null

  const handleSave = () => {
    if (user) {
      setUser({ ...user, bio })
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Profile Settings</h2>

      <div className="glass rounded-xl p-6 border border-border/40">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Wallet Address</label>
            <div className="p-3 bg-muted rounded-lg text-sm text-foreground/60">{user.address}</div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Username</label>
            <input
              type="text"
              value={user.username}
              disabled
              className="w-full p-3 bg-muted rounded-lg text-sm disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="w-full p-3 bg-input rounded-lg text-sm border border-border/40 focus:border-primary/40 focus:outline-none"
              rows={4}
            />
          </div>

          <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-accent">
            Save Changes
          </Button>
        </div>
      </div>

      <div className="glass rounded-xl p-6 border border-border/40">
        <h3 className="font-semibold mb-4">Account Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-foreground/60 text-sm">Joined</p>
            <p className="font-semibold">{user.joinedAt.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-foreground/60 text-sm">Total XP</p>
            <p className="font-semibold text-primary">{user.xp}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
