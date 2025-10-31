import { Request, Response } from "express"
import { createUserFollow, deleteUserFollow, deleteUserFollowById, getFollowById, getMyPendingList, getUserFollowers, getUserFollowings, getUserFollows, updateFollowStatus } from "../services/followService"
import { getBlockByUsers } from "../services/blockService"
import axios from "axios"
import { FollowStatus } from "@brickgram/shared-prisma"

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

//Oct
export const getUserFollowersHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        if (!userId) return res.status(400).json({ message: "User ID is required." })
        const followers = await getUserFollowers(userId)
        return res.status(200).json(followers)
    } catch (error) {
        
    }
}

//Oct
export const getUserFollowingssHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        if (!userId) return res.status(400).json({ message: "User ID is required." })
        const followers = await getUserFollowings(userId)
        return res.status(200).json(followers)
    } catch (error) {
        
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
        
        const isPrivate =  await axios.get(`${process.env.USER_SERVICE_URL}/id/${followingId}`).then(res => res.data.is_private)

        if (isPrivate) {
            const createdFollow = await createUserFollow(followerId, followingId, "PENDING")
            return res.status(201).json({ message: "Follow request sent successfully.", data: createdFollow })
        }

        const createdFollow = await createUserFollow(followerId, followingId, "ACCEPTED")
        res.status(201).json({ message: "Followed successfully.", data: createdFollow })
    } catch (error) {
        res.status(500).json({ message: "Failed to follow the user.", error })
    }
}

export const updateFollowRequest = async (req: Request, res: Response) => {
    try {
        const userId = req.headers['x-user-id'] as string
        const followId = req.params.followId
        const status = req.body.status as FollowStatus
        if (!Object.values(FollowStatus).includes(status)) return res.status(400).json({ message: "Invalid status" })

        if (status === "PENDING") return res.status(400).json({ message: "Status cannot be PENDING." })

        const follow = await getFollowById(followId)

        if (follow?.status === "ACCEPTED") return res.status(400).json({ message: "Already accepted follow request." })

        if (status === "DECLINED") {
            const deletedFollow = await deleteUserFollowById(followId)
            return res.status(200).json({ message: "Follow request declined. The follow request has deleted", data: deletedFollow})
        }
        
        const updatedFollowStatus = await updateFollowStatus(userId, followId, status)
        res.status(200).json({ message: "Follow request updated successfully.", data: updatedFollowStatus })
    } catch (error) {
        res.status(500).json({ message: "Failed to accept the follow request.", error })
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

export const getMyPendingListHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.headers['x-user-id'] as string

        const pendingList = await getMyPendingList(userId)

        res.status(200).json(pendingList)
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve pending list.", error })
    }
}