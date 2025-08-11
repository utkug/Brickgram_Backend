import { Router } from "express"
import { blockUser, getUserBlocksHandler, unblockUser } from "../controllers/blockController"
import { getBlockyId } from "../services/blockService"

const blockRouter = Router()

// localhost:3000/api/block/...
blockRouter.get('/:blockId', getBlockyId)
blockRouter.get('/user/:userId', getUserBlocksHandler)
blockRouter.post('/:blockedId', blockUser)
blockRouter.delete('/:blockedId', unblockUser)

export default blockRouter