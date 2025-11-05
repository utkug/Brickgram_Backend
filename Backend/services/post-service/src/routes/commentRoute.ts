// src/routes/comment.routes.ts
import { Router } from 'express';
import commentController from '../controllers/commentController'; 

const commentRouter = Router();

// Post-specific comment routes
commentRouter.post(
  '/posts/:postId/comments',
  commentController.createComment.bind(commentController)
);

commentRouter.get(
  '/posts/:postId/comments',
  commentController.getCommentsByPost.bind(commentController)
);

commentRouter.get(
  '/posts/:postId/comments/count',
  commentController.getCommentCount.bind(commentController)
);

// Comment-specific routes
commentRouter.get(
  '/comments/:commentId',
  commentController.getCommentById.bind(commentController)
);

commentRouter.get(
  '/comments/:commentId/replies',
  commentController.getRepliesByComment.bind(commentController)
);

commentRouter.put(
  '/comments/:commentId',
  commentController.updateComment.bind(commentController)
);

commentRouter.delete(
  '/comments/:commentId',
  commentController.deleteComment.bind(commentController)
);

export default commentRouter;