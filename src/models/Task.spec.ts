import mongoose from 'mongoose'
import Task from './Task'
import { ITaskDocument } from './types'
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
    const [task] = await wrapAsync<ITaskDocument>(Task.create(successCase))

    expect(task).toBeDefined()
    expect(task?.description).toBe(successCase.description)
    expect(task?.completed).toBe(successCase.completed)
    expect(task).toHaveProperty('_id')
  })

  it('should validate that the description field is required', async () => {
    const [, error] = await wrapAsync<
      ITaskDocument,
      mongoose.Error.ValidationError
    >(Task.create(failCaseNoDescription))
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.description).toBeDefined()
    expect(error.errors.description.message).toBe(
      'Description field is required'
    )
  })
  it('should validate that completed field is optional and has a default value of false', async () => {
    const [task] = await wrapAsync(Task.create(successCompletedFalse))
    expect(task).toBeDefined()
    expect(task?.completed).toBe(false)
  })
})
