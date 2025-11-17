"use client"

import { useUserContext } from "@/lib/hooks/use-user-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Quest } from "@/lib/types"

export function QuestBoard() {
  const { quests, startQuest } = useUserContext()

  const activeQuests = quests.filter((q) => q.status === "active")
  const availableQuests = quests.filter((q) => q.status === "available")
  const completedQuests = quests.filter((q) => q.status === "completed")

  const getCategoryColor = (category: Quest["category"]) => {
    const colors = {
      social: "bg-blue-500/10 text-blue-500 border-blue-500/30",
      onchain: "bg-purple-500/10 text-purple-500 border-purple-500/30",
      learning: "bg-green-500/10 text-green-500 border-green-500/30",
      community: "bg-primary/10 text-primary border-primary/30",
    }
    return colors[category]
  }

  const getDifficultyColor = (difficulty: Quest["difficulty"]) => {
    const colors = {
      beginner: "bg-green-500/10 text-green-500",
      intermediate: "bg-yellow-500/10 text-yellow-500",
      advanced: "bg-red-500/10 text-red-500",
    }
    return colors[difficulty]
  }

  const handleStartQuest = (questId: string) => {
    startQuest(questId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Quest Board</h2>
        <p className="text-foreground/60">Complete quests to earn XP and unlock rewards</p>
      </div>

      {activeQuests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-primary">●</span> Active Quests ({activeQuests.length})
          </h3>
          <div className="grid gap-4">
            {activeQuests.map((quest) => (
              <Card key={quest.id} className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{quest.title}</CardTitle>
                      <CardDescription>{quest.description}</CardDescription>
                    </div>
                    <Badge className={getCategoryColor(quest.category)} variant="outline">
                      {quest.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(quest.difficulty)} variant="secondary">
                        {quest.difficulty}
                      </Badge>
                      <span className="text-sm text-foreground/60">+{quest.rewards.xp} XP</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${quest.progress}%` }}
                      />
                    </div>
                    <Link href={`/quests/quest/${quest.id}`}>
                      <Button className="w-full bg-gradient-to-r from-primary to-accent">Continue Quest</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-4">Available Quests ({availableQuests.length})</h3>
        <div className="grid gap-4">
          {availableQuests.map((quest) => (
            <Card key={quest.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{quest.title}</CardTitle>
                    <CardDescription>{quest.description}</CardDescription>
                  </div>
                  <Badge className={getCategoryColor(quest.category)} variant="outline">
                    {quest.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(quest.difficulty)} variant="secondary">
                      {quest.difficulty}
                    </Badge>
                    <span className="text-sm text-foreground/60">+{quest.rewards.xp} XP</span>
                  </div>
                  <Button onClick={() => handleStartQuest(quest.id)} variant="outline" size="sm">
                    Start Quest
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {completedQuests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Completed Quests ({completedQuests.length})</h3>
          <div className="grid gap-4">
            {completedQuests.map((quest) => (
              <Card key={quest.id} className="opacity-60">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        {quest.title}
                        <span className="text-green-500">✓</span>
                      </CardTitle>
                      <CardDescription>{quest.description}</CardDescription>
                    </div>
                    <Badge className={getCategoryColor(quest.category)} variant="outline">
                      {quest.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(quest.difficulty)} variant="secondary">
                      {quest.difficulty}
                    </Badge>
                    <span className="text-sm text-green-500">+{quest.rewards.xp} XP Earned</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
