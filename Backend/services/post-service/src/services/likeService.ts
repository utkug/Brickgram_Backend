import { PrismaClient } from "@brickgram/shared-prisma"

const prisma = new PrismaClient()

export const getPostLikes = async (postId: string) => {
    return await prisma.likes.count({
        where: {
            post_id: postId
        }
    })
}


export const createPostLike = async (userId: string, postId: string) => {
    return await prisma.likes.create({
        data: {
            user_id: userId,
            post_id: postId
        }
    })
}

export const createCommentLike = async (userId: string, commentId: string) => {
    return await prisma.likes.create({
        data: {
            user_id: userId,
            comment_id: commentId
        }
    })
}

export const deletePostLike = async (userId: string, postId: string) => {
    return await prisma.likes.delete({
        where: {
            user_id_post_id: {user_id: userId, post_id: postId}
        }
    })
}

export const deleteCommentLike = async (userId: string, commentId: string) => {
    return await prisma.likes.delete({
        where: {
            user_id_comment_id: {user_id: userId, comment_id: commentId}
        }
    })
}