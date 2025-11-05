import { Request, Response } from "express"
import { createPost, getPostDetails, getUserPosts } from "../services/postService"

export const createPostHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.headers['x-user-id'] as string
        const postData = req.body
        const post = await createPost(postData, userId)
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({message: error})
    }
}


export const getUserPostsHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const posts = await getUserPosts(userId)
        res.status(201).json(posts)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getPostDetailsHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.headers['x-user-id'] as string
        const postId = req.params.postId
        const post = await getPostDetails(postId, userId)
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({message: error})
    }
}