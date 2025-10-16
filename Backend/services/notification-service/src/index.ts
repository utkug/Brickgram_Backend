import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { startKafkaConsumer } from './kafka'
import router from './routes/notificationRoute'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/notification', router)

const PORT = process.env.PORT || 4001

// Start server
app.listen(PORT, async () => {
  console.log("Starting Notification Service...")
  await startKafkaConsumer()
  console.log("Notification Service is listening for Kafka events.")
  console.log(`Server is running on http://localhost:${PORT}`)
})