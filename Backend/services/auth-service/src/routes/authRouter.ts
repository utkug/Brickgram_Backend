import { Router } from 'express'
import { loginHandler, verifyTokenHandler } from '../controllers/authController'

const router = Router()

router.post('/login', loginHandler)
router.post('/verify', verifyTokenHandler)

export default router