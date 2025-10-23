import { useEffect, useState } from 'react'
import { Avatar, Divider, Modal, ModalBody, ModalContent, ModalHeader} from '@heroui/react'
import { getUserFollowers } from '@/api/user'

interface Followers {
    id: string
    username: string
    name: string
    profile_picture: string
}

interface FollowersCardInput {
    userId?: string
    isOpen?: boolean
    onClose?: () => void 
    onOpenChange?: () => void
}


function FollowersCard({userId, isOpen, onOpenChange}: FollowersCardInput ) {
    const [followers, setFollowers] = useState<Followers[]>([])

    useEffect(() => {
        if (!isOpen || !userId) return;
        //if (followers.length > 0) return; //May change if i want to refresh the followers/followings part after follow/unfollow
        const fetchData = async () => {
            try {
                const data = await getUserFollowers(userId!)
                setFollowers(data.map((item: any) => item.follower))   
            } catch (error) {
                
            }
        }
        fetchData() 
    }, [userId, isOpen])
  return (
    <div className='bg-background text-foreground'>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
            <ModalContent>
            <ModalHeader>
                <h1>Followers</h1>
            </ModalHeader>
            <ModalBody className='flex flex-col'>

                {followers.length ===0 ? (<p className="text-gray-400 text-center">No followers yet.</p>) :  followers.map((follower) => (
                    <div key={follower.id} className='flex flex-row'>
                        <Avatar src={follower.profile_picture} className='' />
                        <div className='flex flex-col'>
                            <span>{follower.name}</span>
                            <span>@{follower.username}</span>
                        </div>
                    </div>
                ))}
                <Divider />
            </ModalBody>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default FollowersCard