import { PrismaClient } from "@brickgram/shared-prisma"

const prisma = new PrismaClient()

export const createUserFollow = async (followerId: string, followingId: string) => {
    return await prisma.follows.create({
        data: {
            follower_id: followerId,
            following_id: followingId
        }
    })
}