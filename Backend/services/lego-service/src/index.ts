import express from 'express'
import router from './routes/themesRoutes'
import dotenv from 'dotenv'
import cors from 'cors'
import setsRouter from './routes/setsRoutes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/lego/themes', router)
app.use('/api/lego/sets', setsRouter)

const PORT = process.env.PORT || 3001

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})