export function ParachainCards() {
  const parachains = [
    { id: 1, name: "Acala", tokens: "ACA", tvl: "$1.2B", status: "Active" },
    { id: 2, name: "Moonbeam", tokens: "GLMR", tvl: "$450M", status: "Active" },
    { id: 3, name: "Astar", tokens: "ASTR", tvl: "$280M", status: "Active" },
    { id: 4, name: "Hydra DX", tokens: "HDX", tvl: "$150M", status: "Active" },
    { id: 5, name: "Bifrost", tokens: "BNC", tvl: "$380M", status: "Active" },
    { id: 6, name: "Zeitgeist", tokens: "ZTG", tvl: "$95M", status: "Active" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Active Parachains</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parachains.map((para) => (
          <div
            key={para.id}
            className="glass rounded-xl p-6 border border-border/40 hover:border-primary/40 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{para.name}</h3>
                <p className="text-sm text-foreground/60">{para.tokens}</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                {para.status}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-foreground/60 mb-1">Total Value Locked</p>
                <p className="text-lg font-bold text-primary">{para.tvl}</p>
              </div>
              <button className="w-full py-2 rounded-lg text-sm font-semibold hover:bg-primary/10 transition border border-border/40">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
