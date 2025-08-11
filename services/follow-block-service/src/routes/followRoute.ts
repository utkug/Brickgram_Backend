import { Router } from "express"
import { followUser, getFollowByIdHandler, getUserFollowsHandler, unfollowUser } from "../controllers/followController"

const followRouter = Router()

// localhost:3000/api/follow/...
followRouter.get('/:followId', getFollowByIdHandler)
followRouter.get('/user/:userId', getUserFollowsHandler)
followRouter.post('/:followingId', followUser)
followRouter.delete('/:followingId', unfollowUser)


export default followRouter