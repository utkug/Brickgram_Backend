import { Router } from "express"
import { getUserNotificationHandler, markNotificationReadHandler } from "../controllers/notificationController"

const router = Router()

router.get('/:userId', getUserNotificationHandler)
router.patch('/:id/read', markNotificationReadHandler)

export default router