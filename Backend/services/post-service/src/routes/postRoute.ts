import { Router } from "express"
import { createPostHandler, getPostDetailsHandler, getUserPostsHandler } from "../controllers/postController"
//import { createCommentHandler } from "../controllers/commentController"

const postRouter = Router()

postRouter.post('', createPostHandler)
postRouter.get('/user/:userId', getUserPostsHandler)
postRouter.get('/:postId', getPostDetailsHandler)

//postRouter.post('/:postId/comments', createCommentHandler)


export default postRouter