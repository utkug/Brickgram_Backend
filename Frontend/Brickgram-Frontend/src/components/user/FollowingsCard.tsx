import { getUserFollowers, getUserFollowings } from '@/api/user';
import { Modal, ModalContent, ModalHeader, ModalBody, Avatar } from '@heroui/react';
import React, { useEffect, useState } from 'react'

interface Followings {
    id: string
    username: string
    name: string
    profile_picture: string
}

interface FollowingsCardInput {
    userId?: string
    isOpen?: boolean
    onClose?: () => void 
    onOpenChange?: () => void
}


function FollowingsCard({userId, isOpen, onOpenChange}: FollowingsCardInput) {
    const [followings, setFollowings] = useState<Followings[]>([])

        useEffect(() => {
            if (!isOpen || !userId) return;
            if (followings.length > 0) return;
            const fetchData = async () => {
                try {
                    const data = await getUserFollowings(userId!)
                    setFollowings(data.map((item: any) => item.follower))   
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
                <h1>Followings</h1>
            </ModalHeader>
            <ModalBody className='flex flex-col'>

                {followings.length ===0 ? (<p className="text-gray-400 text-center">No followings yet.</p>) :  followings.map((following) => (
                    <div key={following.id} className='flex flex-row'>
                        <Avatar src={following.profile_picture} className='' />
                        <div className='flex flex-col'>
                            <span>{following.name}</span>
                            <span>@{following.username}</span>
                        </div>
                    </div>
                ))}
            </ModalBody>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default FollowingsCard