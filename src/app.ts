import express from 'express'
import morgan from 'morgan'
import { logger } from './utils/logger'
import User from './models/User'
import Task from './models/Task'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.post('/users', (req, res) => {
  const user = new User(req.body)
  user
    .save()
    .then(() => {
      return res.status(201).send(
        [user.toObject({ getters: true })].map(user => {
          delete user._id
          delete user.password
          return user
        })[0]
      )
    })
    .catch(err => {
      logger.error(err)
      return res.status(400).send(err)
    })
})

app.post('/tasks', (req, res) => {
  const task = new Task(req.body)
  task
    .save()
    .then(() => {
      return res.status(201).send(task)
    })
    .catch(err => {
      logger.error(err)
      return res.status(400).send(err)
    })
})

export default app
