import { Request, Response } from "express"
import { createUserFollow } from "../services/followService"


export const followUser = async (req: Request, res: Response) => {
    try {
        const { followerId, followingId } = req.body
        const createdFollow = await createUserFollow(followerId, followingId)
        res.status(201).json({createdFollow})
    } catch (error) {
        res.status(500).json({message: "failed", error: error})
    }
}