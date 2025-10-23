import express from 'express'
import cors from 'cors'
import { authMiddleware } from './middlewares/authMiddleware'
import { useProxies } from './routes/proxyRoutes'

const app = express()

// 🔐 Authentication Middleware
app.use(cors())
app.use(express.json())
app.use(authMiddleware)
useProxies(app)

const PORT = process.env.PORT || 3000

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})