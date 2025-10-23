import dotenv from 'dotenv'
import axios from 'axios'
import bcrypt from 'bcrypt'
import { signToken, verifyToken } from '../lib/jwt'
import { PrismaClient } from '@brickgram/shared-prisma'

dotenv.config()

const prisma = new PrismaClient()

export interface CreateUserInput {
    username: string
    name: string
    email: string
    password: string
}
export const login = async (identifier: string, password: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmail = emailRegex.test(identifier)
    const user = await prisma.users.findUnique({
        where: isEmail ? { email: identifier } : { username: identifier },
        select: {
            email: true,
            password: true,
            username: true,
            id: true,
            role: true
        }
    })

    if(!user) {throw new Error("User not found")}

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new Error("E-mail or password is not valid")

    const token = signToken({id: user.id, username: user.username, role: user.role})
    return { token }
}

export const createUser = async (data: CreateUserInput) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    //data.password = hashedPassword
    const registeredUser = await prisma.users.create({
        data: {
            ...data,
            password: hashedPassword
        }
    })
    const token = signToken({id: registeredUser.id, username: registeredUser.username, role: registeredUser.role})
    return { ...registeredUser, token }
}