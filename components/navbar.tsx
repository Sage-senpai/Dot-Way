// components/navbar.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from 'next/navigation'
import { useUserContext } from "@/lib/hooks/use-user-context"
import { Button } from "@/components/ui/button"
import { ProfileSetupModal } from "@/components/profile-setup-modal"
import { Menu, X, Wallet, User, LogOut, Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, walletAddress, isConnecting, logout, isLoading, connectWallet } = useUserContext()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleConnect = async () => {
    try {
      await connectWallet()
      
      setTimeout(() => {
        if (typeof window === 'undefined') return
        
        const hasProfile = localStorage.getItem("dotway_profiles")
        if (hasProfile) {
          const profiles = JSON.parse(hasProfile)
          const currentWallet = localStorage.getItem("dotway_wallet")
          if (currentWallet && profiles[currentWallet]) {
            router.push("/questboard")
            return
          }
        }
        setShowProfileModal(true)
      }, 500)
    } catch (error) {
      console.error("Wallet connection failed:", error)
    }
  }

  const handleDisconnect = () => {
    logout()
    router.push("/")
  }

  const navLinks = [
    { href: "/questboard", label: "QuestBoard" },
    { href: "/quests", label: "Quests" },
    { href: "/profile", label: "Profile" },
    { href: "/community", label: "Community" },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/60 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-primary/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary p-[2px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-full h-full bg-background rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                    ●
                  </span>
                </div>
              </motion.div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                DotWay
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2"
                  >
                    <span className={`text-sm font-medium transition-colors ${
                      isActive(link.href) 
                        ? 'text-primary' 
                        : 'text-foreground/70 hover:text-foreground'
                    }`}>
                      {link.label}
                    </span>
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* User Section */}
            <div className="flex items-center gap-3">
              {user && walletAddress ? (
                <>
                  {/* Notifications Button */}
                  <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                  </Button>

                  {/* User Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 transition-all"
                      >
                        <div className="text-2xl">{user.avatar}</div>
                        <div className="hidden sm:block text-left">
                          <div className="text-xs font-semibold text-foreground">{user.username}</div>
                          <div className="text-[10px] text-foreground/60">
                            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                          </div>
                        </div>
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-white/10">
                      <div className="px-2 py-3 border-b border-white/10">
                        <p className="text-sm font-medium">{user.username}</p>
                        <p className="text-xs text-foreground/60">Level {user.level} • {user.xp} XP</p>
                      </div>
                      <DropdownMenuItem onClick={() => router.push('/profile')}>
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/questboard')}>
                        <Wallet className="w-4 h-4 mr-2" />
                        QuestBoard
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem onClick={handleDisconnect} className="text-red-400">
                        <LogOut className="w-4 h-4 mr-2" />
                        Disconnect
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleConnect}
                    disabled={isConnecting || isLoading}
                    className="relative bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 border-0 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Wallet className="w-4 h-4 mr-2 relative z-10" />
                    <span className="relative z-10">
                      {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </span>
                  </Button>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-3 rounded-lg transition-colors ${
                        isActive(link.href)
                          ? 'bg-primary/20 text-primary'
                          : 'text-foreground/70 hover:bg-white/5 hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {showProfileModal && !user && (
        <ProfileSetupModal 
          onComplete={() => setShowProfileModal(false)} 
          onCancel={() => setShowProfileModal(false)} 
        />
      )}
    </>
  )
}