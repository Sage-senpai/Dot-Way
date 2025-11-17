"use client"

import { Navbar } from "@/components/navbar"
import { useUserContext } from "@/lib/hooks/use-user-context"
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

export default function CategoryQuestsPage() {
  const { user, quests, startQuest } = useUserContext()
  const router = useRouter()
  const params = useParams()
  const category = params?.category as string

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  if (!user) return null

  const categoryQuests = quests.filter((q) => q.category === category)

  const categoryInfo: Record<string, { name: string; icon: string; color: string }> = {
    social: { name: "Social Quests", icon: "🌐", color: "from-blue-500 to-cyan-500" },
    onchain: { name: "On-Chain Quests", icon: "⛓️", color: "from-purple-500 to-pink-500" },
    learning: { name: "Learning Quests", icon: "📚", color: "from-green-500 to-emerald-500" },
    community: { name: "Community Quests", icon: "👥", color: "from-primary to-accent" },
  }

  const info = categoryInfo[category]

  if (!info) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 px-4 text-center">
          <p>Category not found</p>
        </div>
      </main>
    )
  }

  const handleStartQuest = (questId: string) => {
    startQuest(questId)
    router.push(`/quests/quest/${questId}`)
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/quests">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center text-3xl`}>
                {info.icon}
              </div>
              <div>
                <h1 className="text-4xl font-bold">{info.name}</h1>
                <p className="text-foreground/60">{categoryQuests.length} quests available</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {categoryQuests.map((quest) => (
              <Card key={quest.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {quest.title}
                        {quest.status === "completed" && <span className="text-green-500 ml-2">✓</span>}
                      </CardTitle>
                      <CardDescription>{quest.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{quest.difficulty}</Badge>
                      <span className="text-sm text-foreground/60">+{quest.rewards.xp} XP</span>
                      {quest.verificationType === "automatic" && (
                        <Badge variant="outline" className="text-xs">
                          Auto-verify
                        </Badge>
                      )}
                    </div>
                    {quest.status === "available" && (
                      <Button onClick={() => handleStartQuest(quest.id)} variant="outline" size="sm">
                        Start Quest
                      </Button>
                    )}
                    {quest.status === "active" && (
                      <Link href={`/quests/quest/${quest.id}`}>
                        <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                          Continue
                        </Button>
                      </Link>
                    )}
                    {quest.status === "completed" && (
                      <Badge className="bg-green-500/10 text-green-500">Completed</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
