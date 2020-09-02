import { Router } from 'express'
import User from '../models/User'
import { handleError, wrapAsync } from '../utils'

const router = Router()

router.post('/', async (req, res) => {
  const [user, error] = await wrapAsync(User.create(req.body))

  if (error) return handleError(res)(error)

  return res.status(201).send(
    [user?.toObject({ getters: true })].map(user => {
      delete user.password
      return user
    })[0]
  )
})

router.get('/', async (_req, res) => {
  const [users, error] = await wrapAsync(User.find({}).exec())

  if (error) return handleError(res)(error)

  return res.status(200).send(users)
})

router.get('/:id', async (req, res) => {
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

router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValid = updates.every(update => allowedUpdates.includes(update))

  if (!isValid) {
    res.status(400)
    return handleError(res)(new Error('Attemped to update an invalid field'))
  }

  const [user, error] = await wrapAsync(
    User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).exec()
  )

  if (error) return handleError(res)(error)

  if (!user) {
    res.status(404)
    return handleError(res)(new Error('User not found'))
  }

  return res.status(200).send(user)
})

router.delete('/:id', async (req, res) => {
  const [user, error] = await wrapAsync(
    User.findByIdAndDelete(req.params.id).exec()
  )

  if (error) return handleError(res)(error)

  if (!user) {
    res.status(404)
    return handleError(res)(new Error('User not found'))
  }

  return res.status(200).send()
})

export default router
