import { Request, Response } from "express"
import { createUserFollow, deleteUserFollow, getFollowById, getUserFollows } from "../services/followService"


export const getUserFollowsHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const follows = await getUserFollows(userId)
        res.status(200).json({message: "success", follows})
    } catch (error) {
        res.status(500).json({message: "failed", error: error})
    }
}

export const getFollowByIdHandler = async (req: Request, res: Response) => {
    try {
        const followId = req.params.followId
        const follow = await getFollowById(followId)
        res.status(200).json({message: "success", follow})
    } catch (error) {
        res.status(500).json({message: "failed", error: error})
    }
}

export const followUser = async (req: Request, res: Response) => {
    try {
        const { followerId, followingId } = req.body
        const createdFollow = await createUserFollow(followerId, followingId)
        res.status(201).json({createdFollow})
    } catch (error) {
        res.status(500).json({message: "failed", error: error})
    }
}

export const unfollowUser = async (req: Request, res: Response) => {
    try {
        const followId = req.params.followId
        const deletedFollow = await deleteUserFollow(followId)
        res.status(200).json({message: "Unfollowed successfully", deletedFollow})
    } catch (error) {
        res.status(500).json({message: "failed", error: error})
    }
}