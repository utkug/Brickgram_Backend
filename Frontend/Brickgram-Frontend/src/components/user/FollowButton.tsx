import { followUser, unfollowUser } from '@/api/user'
import { Button, useDisclosure } from '@heroui/react'
import { IconUserPlus, IconUserMinus, IconUserEdit, IconClock } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import EditProfile from '../EditProfile'

interface FollowButtonInput {
  user?: User | null
  onFollowChange?: (newFollowing: boolean) => void
}

function FollowButton({user, onFollowChange }: FollowButtonInput) {
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing)
  const {isOpen, onOpen,onOpenChange} = useDisclosure();


  useEffect(() => {
    if (user?.isFollowing !== undefined) setIsFollowing(user?.isFollowing)
  }, [user?.isFollowing, user?.followStatus])

  console.log(user?.isFollowing)
 
  const handleFollowToggle = async () => {
    try {
      if(isFollowing) {
        await unfollowUser(user?.id!)
        setIsFollowing(false)
        onFollowChange?.(false)
      }
      else if(user?.isOwnProfile) { 
        onOpen()
      }
      else if(!isFollowing){
        await followUser(user?.id!)
        setIsFollowing(true)
        onFollowChange?.(true)
      }
    } catch (error) {
      console.error("Follow/Unfollow error:", error)
    }
  }

  const getFollowButtonConfig = () => {
    if (user?.isOwnProfile) {
      return { icon: <IconUserEdit />, label: "Edit" };
    }
    switch (user?.followStatus) {
      case "ACCEPTED":
        return { icon: <IconUserMinus />, label: "Unfollow" };
      case "PENDING":
        return { icon: <IconClock />, label: "Pending" };
      default:
        return { icon: <IconUserPlus />, label: "Follow" };
    }
  };

  const { icon, label } = getFollowButtonConfig()
  return (
    <div>
        <Button
        hidden={false}
          className="mt-5"
          variant="bordered"
          color="warning"
          onPress={handleFollowToggle}
          startContent={icon}
        >
          {label}
        </Button>
        <EditProfile currentUser={user} isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  )
}

export default FollowButton