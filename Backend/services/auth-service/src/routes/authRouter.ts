import { Router } from 'express'
import { registerHandler, loginHandler, verifyTokenHandler } from '../controllers/authController'

const router = Router()

router.post('/login', loginHandler)
router.post('/verify', verifyTokenHandler)
router.post('/register', registerHandler)

export default router