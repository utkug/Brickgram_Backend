import { Request, Response } from "express"
import { getUserNotifications, markAsRead } from "../services/notificationService"


export const getUserNotificationHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const notifications = await getUserNotifications(userId)
        res.status(200).json({ message: "", data: notifications })
    } catch (error) {
        res.status(500).json({})
    }
}

export const markNotificationReadHandler = async (req: Request, res: Response) => {
    try {
        const notificationId = req.params.id
        const notification = await markAsRead(notificationId)
        res.status(200).json({}) 
    } catch (error) {
        res.status(500).json({})
    }
}
