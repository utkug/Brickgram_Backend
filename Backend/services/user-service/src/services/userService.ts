import { CreateUserInput, UpdateUserInput} from "../models/models"
import bcrypt from 'bcrypt'
import { PrismaClient } from "@brickgram/shared-prisma"

const prisma = new PrismaClient()

export const getUserByUsername = async (username: string, currentUserId: string) => {
    const user = await prisma.users.findUnique({
        where: {
            username: username
        },
        omit: {
            password: true
        }
    })

    if (!user) return null

    const [followersCount, followingCount, isFollowing, isFollowedBy] = await Promise.all([
        prisma.follows.count({ where: { following_id: user.id, status: "ACCEPTED" } }),
        prisma.follows.count({ where: { follower_id: user.id, status: "ACCEPTED" } }),
        prisma.follows.findFirst({ where: { follower_id: currentUserId, following_id: user.id }, select: {status: true} }), //ben onu takip ediyor muyum
        prisma.follows.findFirst({ where: { follower_id: user.id, following_id: currentUserId } }) //o bizi takip ediyor mu
    ])
    console.log("c: " + currentUserId +"and u: " + user.id)
    return { ...user, followersCount, followingCount, isFollowing: !!isFollowing, isFollowedBy: !!isFollowedBy, isOwnProfile: currentUserId === user.id, followStatus: isFollowing?.status }
}


export const getUserById = async (id: string, currentUserId: string) => {
    const user = await prisma.users.findUnique({
        where: {
            id
        },
        omit: {
            password: true
        }
    })

    if (!user) return null

    const [followersCount, followingCount, isFollowing, isFollowedBy] = await Promise.all([
        prisma.follows.count({ where: { following_id: id, status: "ACCEPTED" } }),
        prisma.follows.count({ where: { follower_id: id, status: "ACCEPTED" } }),
        prisma.follows.findFirst({ where: { follower_id: currentUserId, following_id: id } }), //ben onu takip ediyor muyum
        prisma.follows.findFirst({ where: { follower_id: id, following_id: currentUserId } }) //o bizi takip ediyor mu
    ])

    // if (user.is_private && !(!!isFollowing)) {
    //     return { ...user, followersCount, followingCount, isFollowing: !!isFollowing, isFollowedBy: !!isFollowedBy, isOwnProfile: currentUserId === user.id }
    // }

    console.log("c: " + currentUserId +"and u: " + user.id)
    return { ...user, followersCount, followingCount, isFollowing: !!isFollowing, isFollowedBy: !!isFollowedBy, isOwnProfile: currentUserId === user.id }

}


export const getUserByEmail = async (email: string) => {
    return await prisma.users.findUnique({
        where: {
            email
        },
        omit: {
            password: true
        }
    })
}


export const searchUsersByUsername = async (query: string, take?: number) => {
    return await prisma.users.findMany({
        where: {
            username: {
                contains: query
            }
        },
        omit: {
            password: true
        },
        take
    })
}

export const createUser = async (data: CreateUserInput) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    //data.password = hashedPassword
    return await prisma.users.create({
        data: {
            ...data,
            password: hashedPassword
        }
    })
}

export const updateUser = async (userId: string, data: UpdateUserInput) => {
    return await prisma.users.update({
        where: {
            id: userId
        },
        data: {
            ...data
        }
    })
}

export const getCurrentUser = async (userId: string) => {
    return await prisma.users.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            username: true,
            name: true,
            profile_picture: true,
            is_verified: true
        }
    })
}