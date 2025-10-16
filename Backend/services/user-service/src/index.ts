import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/userRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', router)

const PORT = process.env.PORT || 3002

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})