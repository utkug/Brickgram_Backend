import { prisma } from "../lib/prisma"
import { CreateUserInput, UpdateUserInput, User } from "../models/models"
import bcrypt from 'bcrypt'


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

export const searchUsersByUsername = async (query: string) => {
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

export const updateUser = async (userId: number, data: UpdateUserInput) => {
    return await prisma.users.update({
        where: {
            id: userId
        },
        data: {
            ...data
        }
    })
}