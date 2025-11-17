"use client"

import { Navbar } from "@/components/navbar"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { useUserContext } from "@/lib/hooks/use-user-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SettingsPage() {
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
        <div className="max-w-2xl mx-auto">
          <ProfileSettings />
        </div>
      </div>
    </main>
  )
}
