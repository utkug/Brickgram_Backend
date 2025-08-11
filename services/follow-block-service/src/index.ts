import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import followRouter from './routes/followRoute'
import blockRouter from './routes/blockRoutes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/follow', followRouter)
app.use('/api/block', blockRouter)


const PORT = process.env.PORT || 3004

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})