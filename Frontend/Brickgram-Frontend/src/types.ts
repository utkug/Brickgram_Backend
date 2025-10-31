interface User {
  id: string
  username: string
  name: string
  email: string
  bio?: string
  location?: string
  profile_picture?: string
  banner?: string
  is_verified?: boolean
  followersCount: number
  followingCount: number
  isFollowing: boolean
  isFollowedBy: boolean
  isOwnProfile: boolean
  is_private: boolean
  followStatus: string
}