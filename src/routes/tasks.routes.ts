import { Router } from 'express'
import Task from '../models/Task'
import { handleError, wrapAsync } from '../utils'

const router = Router()

router.post('/', async (req, res) => {
  const [task, error] = await wrapAsync(Task.create(req.body))

  if (error) return handleError(res)(error)

  return res.status(201).send(task)
})

router.get('/', async (_req, res) => {
  const [tasks, error] = await wrapAsync(Task.find().exec())

  if (error) return handleError(res)(error)

  return res.status(200).send(tasks)
})

router.get('/:id', async (req, res) => {
  const [task, error] = await wrapAsync(Task.findById(req.params.id).exec())

  if (error) return handleError(res)(error)

  if (!task) {
    res.status(404)
    return handleError(res)(new Error('Task not found'))
  }
  return res.status(200).send(task)
})

router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['completed']
  const isValid = updates.every(update => allowedUpdates.includes(update))

  if (!isValid) {
    res.status(400)
    return handleError(res)(new Error('Attemped to update an invalid field'))
  }

  const [task, error] = await wrapAsync(Task.findById(req.params.id).exec())
  if (error) return handleError(res)(error)

  if (!task) {
    res.status(404)
    return handleError(res)(new Error('Task not found'))
  }

  updates.forEach(update => {
    task.set(update, req.body[update])
  })

  const [updatedTask, updateError] = await wrapAsync(task.save())

  if (updateError) {
    res.status(400)
    return handleError(res)(updateError)
  }

  return res.status(200).send(updatedTask)
})

router.delete('/:id', async (req, res) => {
  const [task, error] = await wrapAsync(
    Task.findByIdAndDelete(req.params.id).exec()
  )

  if (error) return handleError(res)(error)

  if (!task) {
    res.status(404)
    return handleError(res)(new Error('Task not found'))
  }

  return res.status(200).send()
})

export default router
