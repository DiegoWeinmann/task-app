import Task from './Task'
import { wrapAsync } from '../utils/wrapAsync'
import * as TestDB from '../utils/testUtils'

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

  it('should connect to database', () => {
    expect(Task).toBeDefined()
  })
})
