import express from 'express'
import morgan from 'morgan'
import { handleError } from './utils/handleError'
import User from './models/User'
import Task from './models/Task'
import { wrapAsync } from './utils/wrapAsync'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.post('/users', async (req, res) => {
  const [user, error] = await wrapAsync(User.create(req.body))
  if (error) return handleError(res)(error)
  return res.status(201).send(
    [user?.toObject({ getters: true })].map(user => {
      delete user.password
      return user
    })[0]
  )
})

app.get('/users', async (_req, res) => {
  const [users, error] = await wrapAsync(User.find({}).exec())
  if (error) return handleError(res)(error)
  return res.status(200).send(users)
})

app.get('/users/:id', async (req, res) => {
  const [user, error] = await wrapAsync(
    User.findById(req.params.id).select('-password').exec()
  )
  if (error) return handleError(res)(error)
  if (!user) {
    res.status(404)
    return handleError(res)(new Error('User not found'))
  }
  return res.status(200).send(user)
})

app.patch('/users/:id', async (req, res) => {
  const [user, error] = await wrapAsync(
    User.findByIdAndUpdate(req.params.id, req.body).exec()
  )
  if (error) return handleError(res)(error)
  if (!user) {
    res.status(404)
    return handleError(res)(new Error('user not found'))
  }
  return res.status(200).send(user)
})

app.post('/tasks', async (req, res) => {
  const [task, error] = await wrapAsync(Task.create(req.body))
  if (error) return handleError(res)(error)
  return res.status(201).send(task)
})

app.get('/tasks', async (_req, res) => {
  const [tasks, error] = await wrapAsync(Task.find().exec())
  if (error) return handleError(res)(error)
  return res.status(200).send(tasks)
})

app.get('/tasks/:id', async (req, res) => {
  const [task, error] = await wrapAsync(Task.findById(req.params.id).exec())
  if (error) return handleError(res)(error)
  if (!task) {
    res.status(404)
    return handleError(res)(new Error('task not found'))
  }
  return res.status(200).send(task)
})

export default app
