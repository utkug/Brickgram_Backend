// src/controllers/comment.controller.ts
import { Request, Response } from 'express';
import commentService from '../services/commentService'; 

export class CommentController {
  // POST /api/posts/:postId/comments
  async createComment(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const { comment_text, parent_id } = req.body;
      const user_id = req.headers["x-user-id"] as string // Assuming auth middleware adds user to req

      if (!user_id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!comment_text || comment_text.trim().length === 0) {
        return res.status(400).json({ error: 'Comment text is required' });
      }

      const comment = await commentService.createComment({
        user_id,
        post_id: postId,
        comment_text: comment_text.trim(),
        parent_id
      });

      return res.status(201).json({
        message: 'Comment created successfully',
        data: comment
      });
    } catch (error: any) {
      console.error('Create comment error:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  // GET /api/posts/:postId/comments
  async getCommentsByPost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const user_id = req.headers["x-user-id"] as string // Optional, for like status

      const comments = await commentService.getCommentsByPost(postId, user_id);

      return res.status(200).json({
        message: 'Comments retrieved successfully',
        data: comments,
        count: comments.length
      });
    } catch (error: any) {
      console.error('Get comments error:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /api/comments/:commentId/replies
  async getRepliesByComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const user_id = req.headers["x-user-id"] as string

      const replies = await commentService.getRepliesByComment(commentId, user_id);

      return res.status(200).json({
        message: 'Replies retrieved successfully',
        data: replies,
        count: replies.length
      });
    } catch (error: any) {
      console.error('Get replies error:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /api/comments/:commentId
  async getCommentById(req: Request, res: Response) {
    try {
      const { commentId } = req.params;

      const comment = await commentService.getCommentById(commentId);

      return res.status(200).json({
        message: 'Comment retrieved successfully',
        data: comment
      });
    } catch (error: any) {
      console.error('Get comment error:', error);
      return res.status(404).json({ error: error.message });
    }
  }

  // PUT /api/comments/:commentId
  async updateComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const { comment_text } = req.body;
      const user_id = req.headers["x-user-id"] as string

      if (!user_id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!comment_text || comment_text.trim().length === 0) {
        return res.status(400).json({ error: 'Comment text is required' });
      }

      const comment = await commentService.updateComment(
        commentId,
        user_id,
        comment_text.trim()
      );

      return res.status(200).json({
        message: 'Comment updated successfully',
        data: comment
      });
    } catch (error: any) {
      console.error('Update comment error:', error);
      const statusCode = error.message.includes('Unauthorized') ? 403 : 400;
      return res.status(statusCode).json({ error: error.message });
    }
  }

  // DELETE /api/comments/:commentId
  async deleteComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const user_id = req.headers["x-user-id"] as string

      if (!user_id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      await commentService.deleteComment(commentId, user_id);

      return res.status(200).json({
        message: 'Comment deleted successfully'
      });
    } catch (error: any) {
      console.error('Delete comment error:', error);
      const statusCode = error.message.includes('Unauthorized') ? 403 : 400;
      return res.status(statusCode).json({ error: error.message });
    }
  }

  // GET /api/posts/:postId/comments/count
  async getCommentCount(req: Request, res: Response) {
    try {
      const { postId } = req.params;

      const count = await commentService.getCommentCount(postId);

      return res.status(200).json({
        message: 'Comment count retrieved successfully',
        count
      });
    } catch (error: any) {
      console.error('Get comment count error:', error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new CommentController();