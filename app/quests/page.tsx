"use client"

import { Navbar } from "@/components/navbar"
import { QuestCategories } from "@/components/quests/quest-categories"
import { useUserContext } from "@/lib/hooks/use-user-context"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"

export default function QuestsPage() {
  const { user } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  if (!user) return null

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Quest Categories</h1>
            <p className="text-foreground/60">
              Explore different types of quests and start earning rewards
            </p>
          </div>

          <QuestCategories />
        </div>
      </div>
    </main>
  )
}
