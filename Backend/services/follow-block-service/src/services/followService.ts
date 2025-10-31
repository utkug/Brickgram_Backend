import { FollowStatus, PrismaClient } from "@brickgram/shared-prisma"
import { kafkaProducer } from "../kafka/producer"

const prisma = new PrismaClient()


export const getUserFollows = async (userId: string) => {
    return await prisma.follows.findMany({
        where: {
            follower_id: userId
        }
    })
}

//Oct
export const getUserFollowers = async (userId: string) => {
    return await prisma.follows.findMany({
        where: {
            following_id: userId,
            status: 'ACCEPTED'
        },
        include: {
            follower: true
        }
    })
}

//Oct
export const getUserFollowings = async (userId: string) => {
    return await prisma.follows.findMany({
        where: {
            follower_id: userId,
            status: 'ACCEPTED'
        },
        include: {
            following: true
        }
    })
}

export const getFollowByUsers = async (followerId: string, followingId: string) => {
    const follow = await prisma.follows.findUnique({
        where: {
            follower_id_following_id: {
                follower_id: followerId,
                following_id: followingId
            }
        }
    })
}

export const getFollowById = async (followId: string) => {
    return await prisma.follows.findUnique({
        where: {
            id: followId
        }
    })
}

export const createUserFollow = async (followerId: string, followingId: string, status: FollowStatus) => {
    const follow = await prisma.follows.create({
        data: {
            follower_id: followerId,
            following_id: followingId,
            status
        }
    })
    await kafkaProducer.send({
        topic: "notifications",
        messages: [
            {
                value: JSON.stringify({
                    type: "FOLLOW_CREATED",
                    message: status==="PENDING" ? "FOLLOW_REQUEST" : "FOLLOW_ACCEPTED",
                    data: {
                        userId: followingId,
                        senderId: followerId
                    }
                })
            }
        ]
    })
    return follow
}

export const updateFollowStatus = async (userId: string, followId: string, status: FollowStatus) => {
    return await prisma.follows.update({
        where: {
            id: followId,
            following_id: userId
        },
        data: {
            status
        }
    })
}

export const deleteUserFollow = async (followerId: string, followingId: string) => {
    return await prisma.follows.delete({
        where: {
            follower_id_following_id: {
                follower_id: followerId,
                following_id: followingId
            }
        }
    })
}

export const deleteUserFollowById = async (id: string) => {
    return await prisma.follows.delete({
        where: {
            id
        }
    })
}

export const getMyPendingList = async (userId: string) => {
    return await prisma.follows.findMany({
        where: {
            following_id: userId,
            status: "PENDING"
        },
        select: {
            id: true,
            follower_id: true,
            following_id: true,
            created_at: true,
            status: true,
            follower: {
                select: {
                id: true,
                username: true,
                name: true,
                profile_picture: true,
                },
            },
            }
    })
}