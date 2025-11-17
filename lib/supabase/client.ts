// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Database Types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          wallet_address: string
          username: string
          avatar: string
          xp: number
          level: number
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wallet_address: string
          username: string
          avatar?: string
          xp?: number
          level?: number
          bio?: string | null
        }
        Update: {
          username?: string
          avatar?: string
          xp?: number
          level?: number
          bio?: string | null
        }
      }
      user_social: {
        Row: {
          id: string
          user_id: string
          twitter: string | null
          telegram: string | null
          discord: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          likes: number
          created_at: string
          updated_at: string
        }
      }
      user_connections: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          created_at: string
        }
      }
    }
  }
}

// Auth Helper Functions
export const signInWithWallet = async (walletAddress: string, username: string) => {
  try {
    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single()

    if (existingUser) {
      return { user: existingUser, isNew: false }
    }

    // Create new user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        wallet_address: walletAddress,
        username,
      })
      .select()
      .single()

    if (error) throw error

    return { user: newUser, isNew: true }
  } catch (error) {
    console.error('Sign in error:', error)
    throw error
  }
}

export const updateUserProfile = async (
  userId: string,
  updates: Database['public']['Tables']['users']['Update']
) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const getUserByWallet = async (walletAddress: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*, user_social(*)')
    .eq('wallet_address', walletAddress)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

// Community Functions
export const createPost = async (userId: string, content: string) => {
  const { data, error } = await supabase
    .from('posts')
    .insert({ user_id: userId, content })
    .select('*, users(*)')
    .single()

  if (error) throw error
  return data
}

export const getPosts = async (limit = 20, offset = 0) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      users (
        id,
        username,
        avatar,
        level
      )
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

export const followUser = async (followerId: string, followingId: string) => {
  const { data, error } = await supabase
    .from('user_connections')
    .insert({ follower_id: followerId, following_id: followingId })
    .select()
    .single()

  if (error) throw error
  return data
}

export const unfollowUser = async (followerId: string, followingId: string) => {
  const { error } = await supabase
    .from('user_connections')
    .delete()
    .eq('follower_id', followerId)
    .eq('following_id', followingId)

  if (error) throw error
}

export const getFollowers = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_connections')
    .select('follower:follower_id(id, username, avatar, level)')
    .eq('following_id', userId)

  if (error) throw error
  return data
}

export const getFollowing = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_connections')
    .select('following:following_id(id, username, avatar, level)')
    .eq('follower_id', userId)

  if (error) throw error
  return data
}