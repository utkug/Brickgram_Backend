import { Kafka } from "kafkajs"
import { createNotification } from "./services/notificationService"

const kafka = new Kafka({
    clientId: "notification-service",
    brokers: ["localhost:9092"]
})

const consumer = kafka.consumer({
    groupId: "notification-group"
})

export const startKafkaConsumer = async () => {
    await consumer.connect()
    await consumer.subscribe({
        topic: "notifications",
        fromBeginning: false // default false
    })

    await consumer.run({
        eachMessage: async ({ message }) => {
            if (!message.value) return
            const event =  JSON.parse(message.value?.toString())
            if (event?.type === "FOLLOW_CREATED") {
                await createNotification({
                    userId: event.data.userId,
                    senderId: event.data.senderId,
                    type: "FOLLOW_CREATED",
                    message: event.message
                })
            }
        }
    })

}