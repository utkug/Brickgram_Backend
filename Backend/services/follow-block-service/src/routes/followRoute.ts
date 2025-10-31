import { Router } from "express"
import { followUser, getFollowByIdHandler, getMyPendingListHandler, getUserFollowersHandler, getUserFollowingssHandler, getUserFollowsHandler, unfollowUser, updateFollowRequest } from "../controllers/followController"

const followRouter = Router()

// localhost:3000/api/follow/...
followRouter.get('/user/:userId', getUserFollowsHandler)

followRouter.delete('/:followingId', unfollowUser)
followRouter.put('/:followId/status', updateFollowRequest)
//followRouter.get('/id/:followId', getFollowByIdHandler)
followRouter.get('/pending', getMyPendingListHandler)
followRouter.get('/:userId/followers', getUserFollowersHandler)
followRouter.get('/:userId/followings', getUserFollowingssHandler)
followRouter.post('/:followingId', followUser)

export default followRouter