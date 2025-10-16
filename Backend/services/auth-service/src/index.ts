import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/authRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', router)

const PORT = process.env.PORT || 3003

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})