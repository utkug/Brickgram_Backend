import { Router } from "express"
import { followUser } from "../controllers/followController"

const followRouter = Router()

followRouter.post('/', followUser)


export default followRouter