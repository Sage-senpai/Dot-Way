"use client"

import { useUserContext } from "@/lib/hooks/use-user-context"
import { useRouter } from 'next/navigation'
import { Navbar } from "@/components/navbar"
import { UserHeader } from "@/components/dashboard/user-header"
import { QuestBoard } from "@/components/questboard/quest-board"
import { NFTGallery } from "@/components/nft/nft-gallery"
import { useEffect } from "react"

export default function QuestBoardPage() {
  const { user, isLoading } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mx-auto mb-4" />
            <p className="text-foreground/70">Loading your quest board...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!user) return null

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <UserHeader />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <QuestBoard />
            </div>
            <div>
              <NFTGallery />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
