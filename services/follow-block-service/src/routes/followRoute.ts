import { Router } from "express"
import { followUser, unfollowUser } from "../controllers/followController"

const followRouter = Router()

followRouter.get('/:followId')
followRouter.get('/user/userId')
followRouter.post('/', followUser)
followRouter.delete('/:followId', unfollowUser)


export default followRouter