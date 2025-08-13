import { Router } from "express"
import { blockUser, getBlockByIdHandler, getUserBlocksHandler, unblockUser } from "../controllers/blockController"

const blockRouter = Router()

// localhost:3000/api/block/...
blockRouter.get('/:blockId', getBlockByIdHandler)
blockRouter.get('/user/:userId', getUserBlocksHandler)
blockRouter.post('/:blockedId', blockUser)
blockRouter.delete('/:blockedId', unblockUser)

export default blockRouter