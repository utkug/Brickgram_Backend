import { NotificationType, PrismaClient } from "@brickgram/shared-prisma"

const prisma = new PrismaClient()

type CreateNotificationInput = {
  userId: string
  senderId?: string
  type: NotificationType
  message: string
  metadata?: any
}

export const createNotification = async (input: CreateNotificationInput) => {
    return await prisma.notifications.create({
        data: {
            user_id: input.userId,
            sender_id: input.senderId,
            type: input.type as NotificationType,
            message: input.message,
            metadata: input.metadata || null
        }
    })
}

export const getUserNotifications = async (userId: string) => {
    return await prisma.notifications.findMany({
        where: {
            user_id: userId
        },
        orderBy: {
            created_at: "desc"
        }
    })
}

export const markAsRead = async (notificationId: string) => {
    return await prisma.notifications.update({
        where: {
            id: notificationId
        },
        data: {
            is_read: true
        }
    })
}