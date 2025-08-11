import { PrismaClient } from "@brickgram/shared-prisma"

const prisma = new PrismaClient()

export const getBlockyId = async (blockId: string) => {
    return await prisma.blocks.findUnique({
        where: {
            id: blockId
        }
    })
}

export const getUserBlokcs = async (userId: string) => {
    return await prisma.blocks.findMany({
        where: {
            blocker_id: userId
        }
    })
}

export const createUserBlock = async (blockerId: string, blockedId: string) => {
    return await prisma.blocks.create({
        data: {
            blocker_id: blockerId,
            blocked_id: blockedId
        }
    })
}

export const deleteUserBlock = async (blockerId: string, blockedId: string) => {
    return await prisma.blocks.findUnique({
        where: {
            blocker_id_blocked_id: {
                blocker_id: blockerId,
                blocked_id: blockedId
            }
        }
    })
}