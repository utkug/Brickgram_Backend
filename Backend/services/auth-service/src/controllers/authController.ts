import { Request, Response } from 'express'
import * as authService from '../services/authService'
import { signToken, verifyToken } from '../lib/jwt'

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const { identifier, password } = req.body
        const result = await authService.login(identifier, password)
        res.json(result)
    } catch (error) {
        res.status(401).json({error: "Login failed"})
    }
}

export const verifyTokenHandler = async (req: Request, res: Response) => {
    try {
        const { token } = req.body
        const result = verifyToken(token)
        res.status(200).json(result)
    } catch (error) {
     res.status(500).json({message: "invalid"})   
    }
}