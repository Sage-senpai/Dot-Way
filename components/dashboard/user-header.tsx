"use client"

import { useUserContext } from "@/lib/hooks/use-user-context"

export function UserHeader() {
  const { user, stats } = useUserContext()

  if (!user) return null

  return (
    <div className="glass rounded-xl p-6 border border-border/40 mb-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
          <p className="text-foreground/60 text-sm">
            {user.address.slice(0, 10)}...{user.address.slice(-8)}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-foreground/60">Level</div>
          <div className="text-4xl font-bold text-primary">{user.level}</div>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-foreground/60">Progress to next level</span>
          <span className="text-primary">{user.xp % 1000} / 1000 XP</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-accent h-full transition-all"
            style={{ width: `${(user.xp % 1000) / 10}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total XP", value: stats?.totalXP || 0 },
          { label: "Modules", value: stats?.modulesCompleted || 0 },
          { label: "NFTs", value: stats?.nftsOwned || 0 },
          { label: "Rank", value: `#${stats?.communityRank || 0}` },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-foreground/60 text-xs mb-1">{stat.label}</div>
            <div className="text-xl font-bold text-primary">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
