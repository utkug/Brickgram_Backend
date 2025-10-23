import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { publicRoutes } from '../routes/publicRoutes'

dotenv.config()

interface JwtPayload {
    id: number
    username: string
    role: string
    iat?: number
    exp?: number
}

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const isPublic = publicRoutes.some(r => r.method === req.method && r.path.test(req.path))


    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        if (isPublic) return next()
        return res.status(401).json({ message: "Unauthorized" })
    }

    const token = authHeader.split(' ')[1]
    const JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({message: "Invalid Token", error: error})
    }
} 