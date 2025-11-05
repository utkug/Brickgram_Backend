import { Request, Response } from "express"
import { createCommentLike, createPostLike, deleteCommentLike, deletePostLike } from "../services/likeService"

export const createLikeHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const id = req.params.id;
    const path = req.path;
    const isPostLike = path.includes("/post/");

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (isPostLike) {
      await createPostLike(userId, id);
      return res.status(201).json({ message: "post like created", type: "post" });
    } else {
      await createCommentLike(userId, id);
      return res.status(201).json({ message: "comment like created", type: "comment" });
    }
  } catch (error: any) {
    console.error("Like handler error:", error);
    // ✅ burada mutlaka json ile cevap dön
    return res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};

export const deleteLikeHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const id = req.params.id;
    const path = req.path;
    const isPostLike = path.includes("/post/");

    if (isPostLike) {
      await deletePostLike(userId, id);
      return res.status(201).json({ message: "post like deleted", type: "post" });
    } else {
      await deleteCommentLike(userId, id);
      return res.status(201).json({ message: "comment like deleted", type: "comment" });
    }
  } catch (error: any) {
    console.error("Like handler error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};