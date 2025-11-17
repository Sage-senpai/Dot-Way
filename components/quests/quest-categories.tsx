"use client"

import { useUserContext } from "@/lib/hooks/use-user-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function QuestCategories() {
  const { quests } = useUserContext()

  const categories = [
    {
      id: "social",
      name: "Social Quests",
      description: "Connect with the Polkadot community on social platforms",
      icon: "🌐",
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500/30",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "onchain",
      name: "On-Chain Quests",
      description: "Complete transactions and interact with the Polkadot blockchain",
      icon: "⛓️",
      color: "from-purple-500 to-pink-500",
      borderColor: "border-purple-500/30",
      bgColor: "bg-purple-500/10",
    },
    {
      id: "learning",
      name: "Learning Quests",
      description: "Educate yourself about Polkadot technology and ecosystem",
      icon: "📚",
      color: "from-green-500 to-emerald-500",
      borderColor: "border-green-500/30",
      bgColor: "bg-green-500/10",
    },
    {
      id: "community",
      name: "Community Quests",
      description: "Contribute to the DotWay community and help others",
      icon: "👥",
      color: "from-primary to-accent",
      borderColor: "border-primary/30",
      bgColor: "bg-primary/10",
    },
  ]

  const getCategoryQuests = (categoryId: string) => {
    return quests.filter((q) => q.category === categoryId)
  }

  const getCategoryStats = (categoryId: string) => {
    const categoryQuests = getCategoryQuests(categoryId)
    const completed = categoryQuests.filter((q) => q.status === "completed").length
    const total = categoryQuests.length
    const totalXP = categoryQuests.reduce((sum, q) => sum + q.rewards.xp, 0)
    return { completed, total, totalXP }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Quests",
            value: quests.length,
          },
          {
            label: "Completed",
            value: quests.filter((q) => q.status === "completed").length,
          },
          {
            label: "Active",
            value: quests.filter((q) => q.status === "active").length,
          },
          {
            label: "Total XP Available",
            value: `${quests.reduce((sum, q) => sum + q.rewards.xp, 0).toLocaleString()}`,
          },
        ].map((stat, i) => (
          <Card key={i} className="glass border-border/40">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-foreground/60 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const stats = getCategoryStats(category.id)
          const categoryQuests = getCategoryQuests(category.id)
          const progressPercent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

          return (
            <Card key={category.id} className={`glass border ${category.borderColor} hover:shadow-lg transition-all`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl`}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <CardDescription className="mt-1">{category.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground/60">
                      {stats.completed} / {stats.total} Quests
                    </span>
                    <span className="text-primary font-semibold">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4">
                  <Badge className={category.bgColor} variant="outline">
                    {stats.totalXP.toLocaleString()} XP
                  </Badge>
                  <Badge variant="secondary">{categoryQuests.filter((q) => q.status === "active").length} Active</Badge>
                </div>

                {/* View Quests Button */}
                <Link href={`/quests/${category.id}`}>
                  <Button className={`w-full bg-gradient-to-r ${category.color}`}>View {category.name}</Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Daily & Weekly Quests Placeholder */}
      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Daily & Weekly Quests</CardTitle>
          <CardDescription>Time-limited quests with bonus rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-foreground/60">
            <p className="text-lg mb-2">Coming Soon</p>
            <p className="text-sm">Daily and weekly quests will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
