import { Router } from "express";
import { createLikeHandler, deleteLikeHandler } from "../controllers/likeController";

// ../api/likes/post
// ../api/likes/comment
const likeRouter = Router()

likeRouter.post("/post/:id", createLikeHandler)
likeRouter.post("/comment/:id", createLikeHandler)
likeRouter.delete("/post/:id", deleteLikeHandler)
likeRouter.delete("/comment/:id", deleteLikeHandler)


export default likeRouter