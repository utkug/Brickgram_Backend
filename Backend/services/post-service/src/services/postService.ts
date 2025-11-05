import { PrismaClient } from "@brickgram/shared-prisma"

const prisma = new PrismaClient()

export const getUserPosts = async (userId: string) => {
    return await prisma.posts.findMany({
        where: {
            author_id: userId
        }
    })
}

export const getPostDetails = async (postId: string, userId?: string) => {
  const post = await prisma.posts.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          name: true,
          profile_picture: true,
          is_verified: true,
          is_private: true
        },
      },
      _count: {
        select: {
          likePost: true,
          commentPost: true,
        },
      },
    },
  });
  if (!post) return null

  let has_liked = false

  if (userId) {
    const existingLike = await prisma.likes.findFirst({
      where: {
        post_id: postId,
        user_id: userId
      }
    })
    has_liked = !!existingLike
  }
  return {
    ...post,
    has_liked
  }
};

export const createPost = async (data: any, userId: string) => {
    return await prisma.posts.create({
        data: {
            author_id: userId,
            ...data
        }
    })
}

export const deletePost = async (postId: string) => {
    return await prisma.posts.delete({
        where: {
            id: postId
        }
    })
}