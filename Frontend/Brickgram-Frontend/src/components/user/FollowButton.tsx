import { followUser, unfollowUser } from '@/api/user'
import { Button } from '@heroui/react'
import { IconUserPlus, IconUserMinus, IconUserEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

interface FollowButtonInput {
  isFollowing?: boolean
  isFollowedBy?: boolean
  isOwnProfile?: boolean
  userId?: string
  onFollowChange?: (newFollowing: boolean) => void
}



function FollowButton({userId, isFollowing: initialIsFollowing, isFollowedBy, isOwnProfile, onFollowChange }: FollowButtonInput) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  useEffect(() => {
    if (initialIsFollowing !== undefined) setIsFollowing(initialIsFollowing)
  }, [initialIsFollowing])

  console.log(initialIsFollowing)
 
  const handleFollowToggle = async () => {
    try {
      if(isFollowing) {
        await unfollowUser(userId!)
        setIsFollowing(false)
        onFollowChange?.(false)
      }
      else{
        await followUser(userId!)
        setIsFollowing(true)
        onFollowChange?.(true)
      }
    } catch (error) {
      console.error("Follow/Unfollow error:", error)
    }
  }

  return (
    <div>
        <Button
        hidden={false}
          className="mt-5"
          variant="bordered"
          color="warning"
          onPress={handleFollowToggle}
          startContent={
            isOwnProfile ? <IconUserEdit /> :  (isFollowing ? <IconUserMinus /> : <IconUserPlus />)
          }
        >
          {isOwnProfile ? "Edit" :  (isFollowing ? "Unfollow" : "Follow")}
        </Button>
    </div>
  )
}

export default FollowButton