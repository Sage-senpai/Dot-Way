export function PostFeed() {
  const posts = [
    {
      id: 1,
      author: "DotLearner42",
      content: "Just completed my first Polkadot learning module! Feeling excited about the ecosystem.",
      likes: 24,
      replies: 3,
      tags: ["learning", "polkadot"],
    },
    {
      id: 2,
      author: "ChainDev99",
      content: "Anyone else working on parachain development? Would love to connect and collaborate!",
      likes: 15,
      replies: 8,
      tags: ["development", "parachains"],
    },
    {
      id: 3,
      author: "GovernanceGuru",
      content: "The latest governance proposal is fascinating. What do you think about the treasury allocation?",
      likes: 32,
      replies: 12,
      tags: ["governance", "discussion"],
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Community Feed</h2>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="glass rounded-xl p-6 border border-border/40 hover:border-primary/40 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-xs text-foreground/60">2 hours ago</p>
                </div>
              </div>
            </div>

            <p className="mb-4 text-foreground/80">{post.content}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex gap-6 text-sm text-foreground/60 border-t border-border/40 pt-4">
              <button className="hover:text-primary transition">❤ {post.likes} Likes</button>
              <button className="hover:text-primary transition">💬 {post.replies} Replies</button>
              <button className="hover:text-primary transition">↗ Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
