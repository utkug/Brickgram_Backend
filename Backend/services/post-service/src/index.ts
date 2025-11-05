import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import postRouter from './routes/postRoute'
import commentRouter from './routes/commentRoute'
import likeRouter from './routes/likeRouter'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/posts', postRouter)
app.use('/api/posts/comments', commentRouter)
app.use('/api/likes', likeRouter)

const PORT = process.env.PORT || 3006

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})