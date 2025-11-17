"use client"

import { Navbar } from "@/components/navbar"
import { useUserContext } from "@/lib/hooks/use-user-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CommunityPage() {
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
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Community Hub
            </h1>
            <p className="text-xl text-foreground/70">Connect, share, and grow with the Polkadot community</p>
          </div>

          <div className="glass rounded-2xl p-12 md:p-20 border border-border/40 space-y-6">
            <div className="text-6xl">🚀</div>
            <h2 className="text-3xl font-bold">Coming Soon</h2>
            <p className="text-foreground/60 text-lg max-w-md mx-auto">
              We're building an amazing community experience. Join us soon for discussions, events, and collaboration
              opportunities.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              Building the future
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: "💬", title: "Discussions", desc: "Share knowledge and ask questions" },
              { icon: "📅", title: "Events", desc: "Participate in community events" },
              { icon: "🤝", title: "Collaborate", desc: "Find collaborators and build together" },
            ].map((item, i) => (
              <div key={i} className="glass p-6 rounded-xl border border-border/40">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
