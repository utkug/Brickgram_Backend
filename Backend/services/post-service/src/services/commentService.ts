// src/services/comment.service.ts
import { PrismaClient } from "@brickgram/shared-prisma"; 

const prisma = new PrismaClient();

export class CommentService {
  // Create a new comment (can be top-level or reply)
  async createComment(data: {
    user_id: string;
    post_id: string;
    comment_text: string;
    parent_id?: string;
  }) {
    // Validate parent comment exists if parent_id provided
    if (data.parent_id) {
      const parentComment = await prisma.comments.findUnique({
        where: { id: data.parent_id }
      });
      
      if (!parentComment) {
        throw new Error('Parent comment not found');
      }
      
      // Ensure parent belongs to same post
      if (parentComment.post_id !== data.post_id) {
        throw new Error('Parent comment does not belong to this post');
      }
    }

    return await prisma.comments.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile_picture: true,
            is_verified: true,
            is_private: true,
            name: true
          }
        },
        _count: {
          select: {
            replies: true,
            likeComment: true
          }
        }
      }
    });
  }

  // Get all comments for a post (with nested replies)
  async getCommentsByPost(post_id: string, user_id?: string) {
    const comments = await prisma.comments.findMany({
      where: {
        post_id,
        parent_id: null // Only get top-level comments
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            profile_picture: true,
            is_verified: true,
            is_private: true,
          }
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                profile_picture: true,
                is_verified: true,
                is_private: true,
              }
            },
            _count: {
              select: {
                replies: true,
                likeComment: true
              }
            }
          },
          orderBy: {
            created_at: 'asc'
          }
        },
        _count: {
          select: {
            replies: true,
            likeComment: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    // If user_id provided, check if user liked each comment
    if (user_id) {
      return await this.attachLikeStatus(comments, user_id);
    }

    return comments;
  }

  // Get replies for a specific comment (for lazy loading)
  async getRepliesByComment(comment_id: string, user_id?: string) {
    const replies = await prisma.comments.findMany({
      where: {
        parent_id: comment_id
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile_picture: true,
            is_verified: true,
            is_private: true,
            name: true
          }
        },
        _count: {
          select: {
            replies: true,
            likeComment: true
          }
        }
      },
      orderBy: {
        created_at: 'asc'
      }
    });

    if (user_id) {
      return await this.attachLikeStatus(replies, user_id);
    }

    return replies;
  }

  // Get a single comment by ID
  async getCommentById(id: string) {
    const comment = await prisma.comments.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile_picture: true,
            is_verified: true,
            is_private: true,
            name: true
          }
        },
        _count: {
          select: {
            replies: true,
            likeComment: true
          }
        }
      }
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    return comment;
  }

  // Update a comment
  async updateComment(id: string, user_id: string, comment_text: string) {
    const comment = await prisma.comments.findUnique({
      where: { id }
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.user_id !== user_id) {
      throw new Error('Unauthorized to update this comment');
    }

    return await prisma.comments.update({
      where: { id },
      data: { comment_text },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile_picture: true,
            is_verified: true,
            is_private: true,
            name: true
          }
        },
        _count: {
          select: {
            replies: true,
            likeComment: true
          }
        }
      }
    });
  }

  // Delete a comment
  async deleteComment(id: string, user_id: string) {
    const comment = await prisma.comments.findUnique({
      where: { id }
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.user_id !== user_id) {
      throw new Error('Unauthorized to delete this comment');
    }

    // Cascade delete will handle replies automatically
    return await prisma.comments.delete({
      where: { id }
    });
  }

  // Get comment count for a post
  async getCommentCount(post_id: string) {
    return await prisma.comments.count({
      where: { post_id }
    });
  }

  // Helper: Attach like status to comments
// Helper: Attach like status to comments (including replies)
private async attachLikeStatus(comments: any[], user_id: string) {
  // 🔹 1. Ana yorumlar ve tüm alt yorumların id'lerini topla
  const allCommentIds: string[] = [];
  for (const comment of comments) {
    allCommentIds.push(comment.id);
    if (comment.replies && comment.replies.length > 0) {
      allCommentIds.push(...comment.replies.map((r: any) => r.id));
    }
  }

  if (allCommentIds.length === 0) return comments;

  // 🔹 2. Kullanıcının bu id'lerde beğenileri var mı?
  const userLikes = await prisma.likes.findMany({
    where: {
      user_id,
      comment_id: { in: allCommentIds },
    },
    select: { comment_id: true },
  });

  const likedIds = new Set(userLikes.map((l) => l.comment_id));

  // 🔹 3. Her yorum ve reply için has_liked'ı ata
  return comments.map((comment) => ({
    ...comment,
    has_liked: likedIds.has(comment.id),
    replies: comment.replies?.map((reply: any) => ({
      ...reply,
      has_liked: likedIds.has(reply.id),
    })) || [],
  }));
}

}

export default new CommentService();