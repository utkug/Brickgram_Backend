import { Router } from "express"
import { createUserHandler, getUserByEmailHandler, getUserByIdHandler, getUserByUsernameHandler, searchUsersByUsernameHandler, updateUserHandler} from "../controllers/userController"


const router = Router()
router.get('/username/:username', getUserByUsernameHandler)
router.get('/email/:email', getUserByEmailHandler)
router.get('/id/:id', getUserByIdHandler)
router.get('/search', searchUsersByUsernameHandler)
router.post('/', createUserHandler)
router.put('/', updateUserHandler)

export default router