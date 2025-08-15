import { FollowStatus, PrismaClient } from "@brickgram/shared-prisma"

const prisma = new PrismaClient()


export const getUserFollows = async (userId: string) => {
    return await prisma.follows.findMany({
        where: {
            follower_id: userId
        }
    })
}

export const getFollowByUsers = async (followerId: string, followingId: string) => {
    return await prisma.follows.findUnique({
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
    return await prisma.follows.create({
        data: {
            follower_id: followerId,
            following_id: followingId,
            status
        }
    })
}

export const updataFollowStatus = async (userId: string, followId: string, status: FollowStatus) => {
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
            follower_id: userId,
            status: "PENDING"
        }
    })
}