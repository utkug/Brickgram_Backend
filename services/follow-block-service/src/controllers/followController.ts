import { Request, Response } from "express"
import { createUserFollow, deleteUserFollow, getFollowById, getUserFollows } from "../services/followService"
import { getBlockByUsers } from "../services/blockService"

export const getUserFollowsHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        if (!userId) return res.status(400).json({ message: "User ID is required." })

        const follows = await getUserFollows(userId)
        if (!follows || follows.length === 0) {
            return res.status(404).json({ message: "No follows found for this user." })
        }

        res.status(200).json({ message: "Follows retrieved successfully.", data: follows })
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve follows.", error })
    }
}

export const getFollowByIdHandler = async (req: Request, res: Response) => {
    try {
        const followId = req.params.followId
        if (!followId) return res.status(400).json({ message: "Follow ID is required." })

        const follow = await getFollowById(followId)
        if (!follow) {
            return res.status(404).json({ message: "Follow not found." })
        }

        res.status(200).json({ message: "Follow retrieved successfully.", data: follow })
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve the follow.", error })
    }
}

export const followUser = async (req: Request, res: Response) => {
    try {
        const followerId = req.headers['x-user-id'] as string
        const followingId = req.params.followingId

        if (!followingId) return res.status(400).json({ message: "Following ID is required." })
        if (followerId === followingId) return res.status(400).json({ message: "User cannot follow itself." })

        const existingBlockFromFollower = await getBlockByUsers(followerId, followingId)
        if (existingBlockFromFollower) return res.status(400).json({message: "Can't follow blocked user"}) 

        const existingBlockFromFollowing = await getBlockByUsers(followingId, followerId)
        if (existingBlockFromFollowing) return res.status(400).json({message: "Can't follow user who blocked you"}) 

        const createdFollow = await createUserFollow(followerId, followingId)
        res.status(201).json({ message: "Followed successfully.", data: createdFollow })
    } catch (error) {
        res.status(500).json({ message: "Failed to follow the user.", error })
    }
}

export const unfollowUser = async (req: Request, res: Response) => {
    try {
        const followerId = req.headers['x-user-id'] as string
        const followingId = req.params.followingId

        if (!followerId) return res.status(401).json({ message: "Unauthorized: Missing user ID." })
        if (!followingId) return res.status(400).json({ message: "Following ID is required." })
        if (followerId === followingId) return res.status(400).json({ message: "User cannot unfollow itself." })

        const deletedFollow = await deleteUserFollow(followerId, followingId)
        if (!deletedFollow) {
            return res.status(404).json({ message: "Follow not found or already removed." })
        }

        res.status(200).json({ message: "Unfollowed successfully.", data: deletedFollow })
    } catch (error) {
        res.status(500).json({ message: "Failed to unfollow the user.", error })
    }
}