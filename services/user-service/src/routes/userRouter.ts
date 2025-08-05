import { Router } from "express"
import { createUserHandler, getUserHandler, updateUserHandler} from "../controllers/userController"
import { authenticate } from "../middlewares/authMiddleware"


const router = Router()
// .../api/users/...
// router.get('/username/:username', getUserByUsernameHandler)
// router.get('/email/:email', getUserByEmailHandler)
router.get('/', getUserHandler) // api/users?username=utku or api/users?email=utku@example.com
router.post('/', createUserHandler)
//router.put('/', authenticate, updateUserHandler)
router.put('/', updateUserHandler)

export default router