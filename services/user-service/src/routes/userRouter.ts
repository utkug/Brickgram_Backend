import { Router } from "express"
import { createUserHandler, getUserByUsernameHandler } from "../controllers/userController"


const router = Router()

router.get('/:username', getUserByUsernameHandler)
router.post('/', createUserHandler)


export default router