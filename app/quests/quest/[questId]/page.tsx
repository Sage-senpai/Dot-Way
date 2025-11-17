"use client"

import { useRouter, useParams } from 'next/navigation'
import { Navbar } from "@/components/navbar"
import { useUserContext } from "@/lib/hooks/use-user-context"
import { useQuestVerification } from "@/lib/hooks/use-quest-verification"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function QuestDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { user, quests, completeQuest, updateQuestProgress } = useUserContext()
  const { verifyQuest, isVerifying } = useQuestVerification()
  const [isCompleting, setIsCompleting] = useState(false)
  const [verificationMessage, setVerificationMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null,
  )

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  const quest = quests.find((q) => q.id === params.questId)

  if (!user || !quest) return null

  const handleCompleteQuest = async () => {
    setVerificationMessage(null)
    setIsCompleting(true)

    if (quest.verificationType === "automatic") {
      const result = await verifyQuest(quest.id, quest.category)
      
      if (result.success) {
        setVerificationMessage({ type: 'success', text: result.message })
        await new Promise((resolve) => setTimeout(resolve, 1000))
        completeQuest(quest.id)
        router.push("/questboard")
      } else {
        setVerificationMessage({ type: 'error', text: result.message })
        setIsCompleting(false)
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      completeQuest(quest.id)
      router.push("/questboard")
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      social: "from-blue-500 to-cyan-500",
      onchain: "from-purple-500 to-pink-500",
      learning: "from-green-500 to-emerald-500",
      community: "from-primary to-accent",
    }
    return colors[category as keyof typeof colors]
  }

  const questContent: Record<string, { steps: string[]; content: string }> = {
    "social-1": {
      steps: [
        "Visit our X (Twitter) profile @DotWayProtocol",
        "Click the Follow button",
        "Enable notifications to stay updated",
      ],
      content: `
# Follow DotWay on X

Stay connected with the DotWay community on X (formerly Twitter) for the latest updates, announcements, and community events.

## Why Follow Us?

- Get instant updates on new quests and features
- Participate in community discussions
- Join exclusive giveaways and contests
- Stay informed about Polkadot ecosystem news

## Steps to Complete

1. Visit our X profile: @DotWayProtocol
2. Click the "Follow" button
3. Turn on notifications for important updates

Once you've followed us, click "Complete Quest" below to claim your reward!
      `,
    },
    "social-2": {
      steps: ["Join the Polkadot Discord server", "Verify your account", "Introduce yourself in #introductions"],
      content: `
# Join Polkadot Discord

Connect with thousands of Polkadot enthusiasts, developers, and community members on Discord.

## What You'll Find

- Technical support channels
- Developer discussions
- Governance conversations
- Community events and AMAs

## How to Join

1. Click the Discord invite link
2. Create an account or sign in
3. Complete verification
4. Say hello in #introductions

The Polkadot Discord is your gateway to the vibrant Web3 community!
      `,
    },
    "social-3": {
      steps: [
        "Take a screenshot of your quest progress",
        "Share on social media with #DotWayQuest",
        "Tag @DotWayProtocol",
      ],
      content: `
# Share Your Journey

Show off your DotWay progress and inspire others to join the quest!

## Sharing Guidelines

- Include a screenshot of your progress
- Use the hashtag #DotWayQuest
- Tag @DotWayProtocol
- Share your favorite part of the journey

## Platforms to Share

- X (Twitter)
- LinkedIn
- Reddit (r/Polkadot)
- Telegram

Your story might inspire the next Polkadot enthusiast!
      `,
    },
    "onchain-1": {
      steps: [
        "Ensure you have DOT in your wallet",
        "Open Polkadot.js or your wallet interface",
        "Send a transaction to any address",
        "Wait for confirmation",
      ],
      content: `
# Make Your First Transaction

Learn how to send DOT tokens on the Polkadot network.

## Prerequisites

- Connected wallet with DOT balance
- Small amount for transaction fees

## Transaction Steps

1. Open your wallet interface
2. Select "Send" or "Transfer"
3. Enter recipient address
4. Specify amount to send
5. Review transaction details
6. Confirm and sign

## Important Notes

- Always double-check recipient address
- Start with small amounts for testing
- Transaction fees are usually very low
- Transactions are irreversible

Complete your first transaction to earn 500 XP!
      `,
    },
    "onchain-2": {
      steps: [
        "Navigate to staking section",
        "Choose validators to nominate",
        "Bond your DOT tokens",
        "Confirm staking transaction",
      ],
      content: `
# Stake Your DOT

Start earning rewards by staking your DOT tokens and securing the network.

## What is Staking?

Staking involves:
- Bonding DOT tokens
- Nominating validators
- Earning rewards (10-15% APY)
- Supporting network security

## How to Stake

1. Go to Polkadot staking dashboard
2. Click "Stake" or "Nominate"
3. Choose up to 16 validators
4. Bond your DOT (minimum 10 DOT)
5. Wait for next era to start earning

## Validator Selection Tips

- Check commission rates (5-10% typical)
- Review performance history
- Diversify nominations
- Avoid oversubscribed validators

Start staking and earn passive income!
      `,
    },
    "onchain-3": {
      steps: [
        "Browse active referenda on OpenGov",
        "Read proposal details carefully",
        "Cast your vote with conviction",
        "Track proposal outcome",
      ],
      content: `
# Participate in Governance

Have your say in Polkadot's future by voting on governance proposals.

## Understanding OpenGov

Polkadot's governance system allows token holders to:
- Vote on network upgrades
- Manage the treasury
- Influence protocol direction
- Shape the ecosystem

## How to Vote

1. Visit Polkadot governance portal
2. Browse active referenda
3. Research proposals thoroughly
4. Choose your conviction multiplier
5. Cast your vote

## Conviction Voting

Lock your tokens longer for more voting power:
- 1x: No lock period
- 2x: Lock for 8 days
- Up to 6x: Lock for 896 days

Your voice matters in decentralized governance!
      `,
    },
    "learning-1": {
      steps: ["Read the introduction content", "Watch the overview video", "Complete the knowledge check"],
      content: `
# Welcome to Polkadot

Polkadot is a next-generation blockchain protocol that enables different blockchains to exchange information and transactions in a secure, scalable manner.

## Key Concepts

### 1. Heterogeneous Multi-Chain Architecture
Unlike traditional blockchains, Polkadot uses a unique architecture where:
- The **Relay Chain** acts as the central hub
- **Parachains** are specialized blockchains connected to the relay chain
- Each parachain can be optimized for specific use cases

### 2. Shared Security
All parachains share security with the relay chain. This means:
- Validators secure multiple chains simultaneously
- New chains don't need their own validator set
- Lower barrier to entry for new blockchain projects

### 3. Interoperability
Polkadot enables seamless communication between chains:
- Cross-chain message passing (XCMP)
- Asset transfers between chains
- Shared liquidity pools

## Getting Started

To succeed in the Polkadot ecosystem, understand:
1. The role of DOT tokens
2. How staking works
3. The governance model

Complete this quest to earn 300 XP and continue your journey!
      `,
    },
    "learning-2": {
      steps: ["Study parachain architecture", "Learn about slot auctions", "Explore popular parachains"],
      content: `
# Understanding Parachains

Parachains are specialized blockchains that run parallel to Polkadot's Relay Chain, each optimized for specific use cases.

## What is a Parachain?

A parachain is:
- A blockchain connected to the Relay Chain
- Secured by the Relay Chain validators
- Capable of communicating with other parachains
- Customizable for specific applications

## Parachain Slots

Parachains must secure a slot by:
- Participating in auctions
- Winning leases (typically 2 years)
- Paying competitive prices in DOT

## Popular Parachains

- **Acala**: DeFi hub with decentralized exchange
- **Moonbeam**: Ethereum-compatible smart contracts
- **Astar**: Multi-chain smart contract platform
- **Polkadex**: Decentralized exchange

## XCM Protocol

Cross-Consensus Messaging enables:
- Inter-parachain asset transfers
- Smart contract calls across chains
- Complex multi-chain transactions

Master parachain concepts for 500 XP!
      `,
    },
    "learning-3": {
      steps: [
        "Learn Rust basics for blockchain",
        "Study ink! syntax and structure",
        "Review sample contracts",
        "Practice with examples",
      ],
      content: `
# Smart Contract Development

Learn to build smart contracts with ink! on Polkadot.

## Why Ink!?

- **Rust Benefits**: Memory safety, performance
- **WASM Compilation**: Efficient bytecode
- **Easy Integration**: Works with Substrate

## Basic Contract Structure

\`\`\`rust
#[ink::contract]
pub mod my_contract {
    #[ink(storage)]
    pub struct MyContract {
        value: u32,
    }

    impl MyContract {
        #[ink(constructor)]
        pub fn new(initial: u32) -> Self {
            Self { value: initial }
        }

        #[ink(message)]
        pub fn get(&self) -> u32 {
            self.value
        }
    }
}
\`\`\`

## Development Tools

- **Rust**: Core language
- **Substrate**: Blockchain framework
- **Cargo Contract**: Development CLI
- **Polkadot.js**: Interaction library

Build on Polkadot and earn 1000 XP!
      `,
    },
    "community-1": {
      steps: [
        "Generate your referral link",
        "Share link with friends",
        "Wait for friend to sign up",
        "Claim your reward",
      ],
      content: `
# Refer a Friend

Grow the DotWay community and earn rewards by inviting friends!

## How Referrals Work

1. Get your unique referral link
2. Share with friends interested in Web3
3. When they join and complete first quest
4. You both earn bonus XP!

## Referral Benefits

- **You earn**: 250 XP per referral
- **Your friend earns**: 100 XP bonus
- **Unlimited referrals**: No cap on rewards

## Best Places to Share

- Social media platforms
- Crypto communities
- Discord servers
- Telegram groups

Help grow the Polkadot community!
      `,
    },
    "community-2": {
      steps: [
        "Join DotWay community forum",
        "Find unanswered questions",
        "Provide helpful responses",
        "Get community upvotes",
      ],
      content: `
# Answer Community Questions

Share your knowledge and help new users succeed in their Polkadot journey.

## Why Help Others?

- Build your reputation
- Deepen your own understanding
- Earn community recognition
- Make the ecosystem more welcoming

## How to Contribute

1. Browse community questions
2. Find topics you know well
3. Provide clear, helpful answers
4. Be patient and encouraging

## Tips for Great Answers

- Be specific and detailed
- Include examples when possible
- Link to official documentation
- Follow up if needed

Help 5 users to complete this quest!
      `,
    },
    "community-3": {
      steps: [
        "Choose your content format (guide/video)",
        "Research your topic thoroughly",
        "Create high-quality content",
        "Submit for community review",
      ],
      content: `
# Create Educational Content

Become a Polkadot educator and earn exclusive rewards!

## Content Ideas

- Beginner guides
- Video tutorials
- Technical deep-dives
- Use case walkthroughs

## Quality Standards

Your content should be:
- Original and accurate
- Well-structured and clear
- Helpful to the community
- Properly sourced

## Submission Process

1. Create your content
2. Submit via community portal
3. Await review (3-5 days)
4. Receive feedback
5. Claim NFT reward upon approval

## Rewards

- 2000 XP
- Exclusive "Content Creator" NFT
- Featured in community showcase
- Potential collaboration opportunities

Share your knowledge and earn recognition!
      `,
    },
  }

  const content = questContent[quest.id]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Button onClick={() => router.back()} variant="ghost" size="sm" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card className="glass border-border/40 mb-8">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6">
                <div>
                  <Badge className="mb-4" variant="outline">
                    {quest.category.toUpperCase()}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{quest.title}</h1>
                  <p className="text-lg text-foreground/70">{quest.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border/40">
                  <div>
                    <div className="text-sm text-foreground/60">Reward</div>
                    <div className="text-2xl font-bold text-primary">+{quest.rewards.xp} XP</div>
                  </div>
                  <div>
                    <div className="text-sm text-foreground/60">Difficulty</div>
                    <div className="text-2xl font-bold capitalize">{quest.difficulty}</div>
                  </div>
                  <div>
                    <div className="text-sm text-foreground/60">Verification</div>
                    <div className="text-2xl font-bold capitalize">{quest.verificationType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-foreground/60">Status</div>
                    <div className="text-2xl font-bold">
                      {quest.status === "completed" ? "✓ Completed" : "In Progress"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {content?.steps && (
            <Card className="glass border-border/40 mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Steps to Complete</h2>
                <div className="space-y-3">
                  {content.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${getCategoryColor(quest.category)} flex items-center justify-center text-white font-bold flex-shrink-0`}
                      >
                        {index + 1}
                      </div>
                      <p className="text-foreground/80 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="glass border-border/40 mb-8">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                <div className="text-foreground/80 space-y-4 whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                  {content?.content || "Quest content not available"}
                </div>
              </div>
            </CardContent>
          </Card>

          {quest.status !== "completed" && (
            <div className="space-y-4">
              {verificationMessage && (
                <Card className={verificationMessage.type === 'success' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}>
                  <CardContent className="p-4">
                    <p className={verificationMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}>
                      {verificationMessage.text}
                    </p>
                  </CardContent>
                </Card>
              )}
              
              <Button
                onClick={handleCompleteQuest}
                disabled={isCompleting || isVerifying}
                className={`w-full py-6 text-lg bg-gradient-to-r ${getCategoryColor(quest.category)} hover:shadow-xl transition-all`}
              >
                {isCompleting || isVerifying ? (
                  quest.verificationType === "automatic" ? "Verifying..." : "Completing..."
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    {quest.verificationType === "automatic" ? "Verify & " : ""}Complete Quest & Claim {quest.rewards.xp} XP
                  </>
                )}
              </Button>
            </div>
          )}

          {quest.status === "completed" && (
            <Card className="bg-green-500/10 border-green-500/30">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="text-xl font-bold text-green-500">Quest Completed!</p>
                <p className="text-foreground/60">You earned {quest.rewards.xp} XP</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
