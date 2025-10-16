import dotenv from 'dotenv'
import axios from 'axios'
import bcrypt from 'bcrypt'
import { signToken, verifyToken } from '../lib/jwt'
import { PrismaClient } from '@brickgram/shared-prisma'

dotenv.config()

const prisma = new PrismaClient()

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:3002" 

export const login = async (email: string, password: string) => {
    const user = await prisma.users.findUnique({
        where: {
            email
        },
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