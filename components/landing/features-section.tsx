export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-card/30 border-t border-border/40">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose DotWay?</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Comprehensive Learning Paths",
              description: "From beginner to expert - structured courses covering all aspects of Polkadot",
              points: ["Introduction modules", "Advanced development", "Governance participation"],
            },
            {
              title: "Earn While You Learn",
              description: "Gain XP points that translate to real rewards and recognition",
              points: ["Level up your profile", "Unlock exclusive content", "Claim limited NFTs"],
            },
            {
              title: "Community Engagement",
              description: "Connect with other learners, share knowledge, and grow together",
              points: ["Discussion forums", "Collaborative projects", "Mentorship programs"],
            },
            {
              title: "Real Polkadot Integration",
              description: "Direct connection to the Polkadot blockchain and ecosystem",
              points: ["Wallet connectivity", "On-chain achievements", "Parachain exploration"],
            },
          ].map((feature, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
              <ul className="space-y-2">
                {feature.points.map((point, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-foreground/60">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
