import { Router } from "express"
import { followUser, getFollowByIdHandler, getMyPendingListHandler, getUserFollowsHandler, unfollowUser, updateFollowRequest } from "../controllers/followController"

const followRouter = Router()

// localhost:3000/api/follow/...
followRouter.get('/pending', getMyPendingListHandler)
followRouter.get('/:followId', getFollowByIdHandler)
followRouter.get('/user/:userId', getUserFollowsHandler)
followRouter.post('/:followingId', followUser)
followRouter.delete('/:followingId', unfollowUser)
followRouter.put('/:followId/status', updateFollowRequest)

export default followRouter