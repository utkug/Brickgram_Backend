import { CreateUserInput, UpdateUserInput} from "../models/models"
import bcrypt from 'bcrypt'
import { PrismaClient } from "@brickgram/shared-prisma"

const prisma = new PrismaClient()

export const getUserByUsername = async (username: string) => {
    return await prisma.users.findUnique({
        where: {
            username: username
        }
    })
}

export const getUserByEmail = async (email: string) => {
    return await prisma.users.findUnique({
        where: {
            email
        }
    })
}

export const getUserById = async (id: string) => {
    return await prisma.users.findUnique({
        where: {
            id
        }
    })
}

export const searchUsersByUsername = async (query: string, take: number) => {
    return await prisma.users.findMany({
        where: {
            username: {
                contains: query
            }
        },
        omit: {
            password: true
        },
        take: take
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