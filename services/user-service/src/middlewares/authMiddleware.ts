import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface JwtPayload1 {
    id: number
    username: string
    role: string
    iat?: number
    exp?: number
}

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload1
}


export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({message: "Unauthorized. No token provided.", status: "error"})
    }

    const token = authHeader.split(' ')[1] //JWT Token
    const JWT_SECRET = process.env.JWT_SECRET || "KOCHAMCIEMAGDALENA"
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload1
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' , error: error})       
    }
}