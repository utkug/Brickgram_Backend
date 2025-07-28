import dotenv from 'dotenv'
import axios from 'axios'
import bcrypt from 'bcrypt'
import { signToken, verifyToken } from '../lib/jwt'
dotenv.config()

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:3002" 

export const login = async (email: string, password: string) => {
    const response = await axios.get(`${USER_SERVICE_URL}/api/users?email=${email}`)
    const user = response.data.data

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new Error("E-mail or password is not valid")

    const token = signToken({id: user.id, username: user.username, role: user.role})
    return { token }
}