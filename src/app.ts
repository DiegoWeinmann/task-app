import express from 'express'
import morgan from 'morgan'
import { usersRouter, tasksRouter } from './routes'

const app = express()
app.use(express.json())
app.use(morgan('dev'))

app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)

export default app
