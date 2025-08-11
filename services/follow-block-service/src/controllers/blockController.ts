import { Request, Response } from "express"
import { createUserBlock, deleteUserBlock, getBlockyId, getUserBlokcs } from "../services/blockService"

export const getFollowByIdHandler = async (req: Request, res: Response) => {
    try {
        const blockId = req.params.blockId
        if (!blockId) return res.status(400).json({ message: "Block ID is required." })

        const follow = await getBlockyId(blockId)
        if (!follow) {
            return res.status(404).json({ message: "Block not found." })
        }
        res.status(200).json({ message: "Block retrieved successfully.", follow })
    } catch (error) {
        res.status(500).json({ message: "Block to retrieve the follow.", error })
    }
}

export const getUserBlocksHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        if (!userId) return res.status(400).json({ message: "User ID is required." })

        const blocks = await getUserBlokcs(userId)
        if (!blocks || blocks.length === 0) {
            return res.status(404).json({ message: "No blocks found for this user." })
        }
        res.status(200).json({ message: "Blocks retrieved successfully.", blocks })
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve blocks.", error })
    }
}

export const blockUser = async (req: Request, res: Response) => {
    try {
        const blockerId = req.headers['x-user-id'] as string
        const blockedId = req.params.blockedId

        if (!blockedId) return res.status(400).json({ message: "Blocked ID is required." })
        if (blockerId === blockedId) return res.status(400).json({ message: "User cannot blokc itself." })

        const createdBlock = await createUserBlock(blockerId, blockedId)
        res.status(201).json({ message: "Blocked successfully.", createdBlock })
    } catch (error) {
        res.status(500).json({ message: "Failed to block the user.", error })
    }
}

export const unblockUser = async (req: Request, res: Response) => {
    try {
        const blockerId = req.headers['x-user-id'] as string
        const blockedId = req.params.blockedId

        if (!blockerId) return res.status(401).json({ message: "Unauthorized: Missing user ID." })
        if (!blockedId) return res.status(400).json({ message: "Blocked ID is required." })
        if (blockerId === blockedId) return res.status(400).json({ message: "User cannot unblock itself." })

        const deletedBlock = await deleteUserBlock(blockerId, blockedId)
        if (!deletedBlock) {
            return res.status(404).json({ message: "Block not found or already removed." })
        }

        res.status(200).json({ message: "Unblocked successfully.", deletedBlock })
    } catch (error) {
        res.status(500).json({ message: "Failed to unblock the user.", error })
    }
}