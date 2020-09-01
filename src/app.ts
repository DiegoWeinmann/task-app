import express, { Response } from 'express'
import morgan from 'morgan'
import { logger } from './utils/logger'
import User from './models/User'
import Task from './models/Task'
import { wrapAsync } from './utils/wrapAsync'

const app = express()

const handleError = (res: Response) => (error: Error) => {
  return res
    .status(res.statusCode || 500)
    .send(error.message || 'Internal server error')
}

app.use(express.json())
app.use(morgan('dev'))

app.post('/users', async (req, res) => {
  const [success, user, error] = await wrapAsync(User.create(req.body))

  if (!success) return handleError(res)(error)

  return res.status(201).send(
    [user.toObject({ getters: true })].map(user => {
      delete user.password
      return user
    })[0]
  )
})

app.get('/users', async (_req, res) => {
  const [success, users, error] = await wrapAsync(User.find({}).exec())
  if (!success) return handleError(res)(error)
  return res.status(200).send(users)
})

app.get('/users/:id', async (req, res) => {
  const [success, user, error] = await wrapAsync(
    User.findById(req.params.id).select('-password').exec()
  )
  if (!success) return handleError(res)(error)
  if (!user) {
    res.status(404)
    return handleError(res)(new Error('User not found'))
  }
  return res.status(200).send(user)
})

app.post('/tasks', async (req, res) => {
  const [success, task, error] = await wrapAsync(Task.create(req.body))
  if (!success) return handleError(res)(error)
  return res.status(201).send(task)
})

app.get('/tasks', async (_req, res) => {
  const [success, tasks, error] = await wrapAsync(Task.find().exec())
  if (!success) return handleError(res)(error)
  return res.status(200).send(tasks)
})

app.get('/tasks/:id', async (req, res) => {
  const [success, task, error] = await wrapAsync(
    Task.findById(req.params.id).exec()
  )
  if (!success) return handleError(res)(error)
  if (!task) {
    res.status(404)
    return handleError(res)(new Error('task not found'))
  }
  return res.status(200).send(task)
})

export default app
