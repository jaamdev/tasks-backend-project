import 'dotenv/config'
import express from 'express'
import corsMiddleware from './src/middleware/cors.js'
import connectDB from './src/config/db.js'
import userRouter from './src/routes/user.routes.js'
import taskRouter from './src/routes/task.routes.js'
import adminRouter from './src/routes/admin.routes.js'

const PORT = process.env.PORT || 3001

const server = express()

server.disable('x-powered-by')
server.use(express.json())
server.use(corsMiddleware())
server.use('/cuenta', userRouter)
server.use('/tarea', taskRouter)
server.use('/admin', adminRouter)
server.all('*', (req, res) => res.redirect('https://tasks-frontend-project.vercel.app'))

async function initServer () {
  const isDBReady = await connectDB(process.env.DB_URL)

  if (!isDBReady) {
    throw new Error('Fallo en la conexión con la base de datos')
  }

  server.listen(PORT, () => {
    console.log('Server listening')
  })
}

initServer()
