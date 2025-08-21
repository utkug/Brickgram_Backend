import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: "follow-service",
  brokers: ["localhost:9092"]
})

export const kafkaProducer = kafka.producer()

export const connectProducer = async () => {
    await kafkaProducer.connect()
}