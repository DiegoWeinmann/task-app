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

app.get('/users', (_req, res) => {
  User.find()
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      logger.error(err.message)
      res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params
  User.findById(id)
    .select('-password')
    .then(user => {
      if (!user) {
        return res.status(404).send()
      }
      res.status(200).send(user)
    })
    .catch(err => {
      logger.error(err.message)
      res.status(500).send()
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

app.get('/tasks', (_req, res) => {
  Task.find()
    .then(tasks => {
      res.send(tasks)
    })
    .catch(err => {
      logger.error(err.message)
      res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params
  Task.findById(id)
    .then(task => {
      if (!task) {
        return res.status(404).send()
      }
      res.send(task)
    })
    .catch(err => {
      logger.error(err.message)
      res.status(500).send()
    })
})
export default app
