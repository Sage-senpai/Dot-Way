# DotWay

**DotWay** is a Web3 onboarding platform built on **Polkadot**, designed to simplify user migration and ecosystem adoption. Users can securely log in using social accounts (X/Twitter), connect their wallets, and seamlessly onboard into the Polkadot ecosystem. DotWay serves as a bridge for new users and migrators, guiding them through wallet setup, ecosystem exploration, and integration with Polkadot dApps. It prioritizes security, user experience, and ease of access while providing a foundation for future ecosystem tools.

---

## **Built With**

- **Next.js** – Modern web framework for fast, SSR-enabled development  
- **TypeScript** – Type-safe, scalable codebase  
- **TailwindCSS** – Utility-first CSS framework for responsive design  
- **Framer Motion** – Smooth animations and interactive UI  
- **Supabase (PostgreSQL + Auth + Storage)** – Backend, database, and authentication  
- **Polkadot.js** – Wallet integration, account management, and blockchain interactions  
- **Vercel** – Deployment and hosting platform  
- **Figma** – UI/UX design and prototyping  
- **pnpm** – Fast dependency management  

---

## **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/your-username/dotway.git
cd dotway

Install dependencies

pnpm install
# or
npm install
# or
yarn install


Set up environment variables
Create a .env file in the root directory with:

NEXT_PUBLIC_TWITTER_API_KEY=your-twitter-api-key
NEXT_PUBLIC_DISCORD_WEBHOOK_URL=your-discord-webhook
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your-telegram-bot-token
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_POLKADOT_ENDPOINT=wss://rpc.polkadot.io


Run the App

pnpm dev
# or
npm run dev
# or
yarn dev
