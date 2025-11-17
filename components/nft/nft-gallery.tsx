"use client"

import { useUserContext } from "@/lib/hooks/use-user-context"
import { Button } from "@/components/ui/button"

const rarityColors = {
  common: "border-gray-400",
  uncommon: "border-green-400",
  rare: "border-blue-400",
  epic: "border-purple-400",
  legendary: "border-yellow-400",
}

const rarityBgGradient = {
  common: "from-gray-500/20 to-gray-600/20",
  uncommon: "from-green-500/20 to-green-600/20",
  rare: "from-blue-500/20 to-blue-600/20",
  epic: "from-purple-500/20 to-purple-600/20",
  legendary: "from-yellow-500/20 to-yellow-600/20",
}

export function NFTGallery() {
  const { nfts, claimNFT } = useUserContext()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">NFT Collectibles</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className={`group rounded-xl overflow-hidden border-2 ${rarityColors[nft.rarity]} glass transition transform hover:scale-105 flex flex-col`}
            >
              <div
                className={`bg-gradient-to-br ${rarityBgGradient[nft.rarity]} h-48 flex items-center justify-center relative overflow-hidden flex-shrink-0`}
              >
                <div className="absolute inset-0 opacity-20">
                  <div className="dot-pattern" />
                </div>
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full blur-3xl animate-pulse" />
                  <div className="relative text-7xl opacity-80 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                      ●
                    </div>
                    <div className="opacity-40">●</div>
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex flex-col items-center gap-2 mb-3">
                  <h3
                    className={`font-bold text-center leading-tight ${nft.name.length > 20 ? "text-base" : "text-lg"}`}
                  >
                    {nft.name}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded text-white uppercase tracking-wide`}
                    style={{
                      background: {
                        common: "#9CA3AF",
                        uncommon: "#10B981",
                        rare: "#3B82F6",
                        epic: "#A855F7",
                        legendary: "#FBBF24",
                      }[nft.rarity],
                    }}
                  >
                    {nft.rarity}
                  </span>
                </div>
                <p className="text-sm text-foreground/70 mb-4 leading-relaxed flex-1 text-center">{nft.description}</p>

                {nft.claimable ? (
                  <Button
                    onClick={() => claimNFT(nft.id)}
                    size="sm"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all h-auto px-3 py-2"
                  >
                    <span className="text-xs leading-tight">
                      Claim NFT
                      {nft.claimPrice > 0 && (
                        <>
                          <br />
                          <span className="opacity-90">({nft.claimPrice} XP)</span>
                        </>
                      )}
                    </span>
                  </Button>
                ) : (
                  <div className="w-full py-2 text-center text-sm font-medium text-primary">✓ Owned</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
