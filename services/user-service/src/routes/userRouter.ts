import { Router } from "express"
import { createUserHandler, getUserHandler} from "../controllers/userController"


const router = Router()
// .../api/users/...
// router.get('/username/:username', getUserByUsernameHandler)
// router.get('/email/:email', getUserByEmailHandler)
router.get('/', getUserHandler) // api/users?username=utku or api/users?email=utku@example.com
router.post('/', createUserHandler)
//router.put('/',) Update User


export default router