import mongoose from 'mongoose'
import Task from './Task'
import { wrapAsync } from '../utils/wrapAsync'
import * as TestDB from '../utils/testUtils'

const successCase = {
  description: 'TestCase',
  completed: true
}

const failCaseNoDescription = {
  description: '',
  completed: false
}

const successCompletedFalse = {
  description: 'test'
}

describe('Task Model', () => {
  beforeAll(async () => {
    await TestDB.connect()
  })

  beforeEach(async () => {
    await TestDB.clearDatabase()
  })

  afterAll(async () => {
    await TestDB.closeDatabase()
  })

  it('should create a Task', async () => {
    const [, result] = await wrapAsync(Task.create(successCase))

    expect(result).toBeDefined()
    expect(result?.description).toBe(successCase.description)
    expect(result?.completed).toBe(successCase.completed)
    expect(result).toHaveProperty('_id')
  })

  it('should validate that the description field is required', async () => {
    const [, , error] = await wrapAsync(Task.create(failCaseNoDescription))
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.description).toBeDefined()
    expect(error.errors.description.message).toBe(
      'Description field is required'
    )
  })
  it('should validate that completed field is optional and has a default value of false', async () => {
    const [, result] = await wrapAsync(Task.create(successCompletedFalse))
    expect(result).toBeDefined()
    expect(result?.completed).toBe(false)
  })
})
