import request from 'supertest'
import app from './app'
import * as TestDB from './utils/testUtils'

const usersEndpoint = '/users'
const tasksEndpoint = '/tasks'

describe(usersEndpoint, () => {
  beforeAll(() => {
    TestDB.connect()
  })

  afterAll(() => {
    return TestDB.closeDatabase()
  })

  beforeEach(() => {
    return TestDB.clearDatabase()
  })

  test(`POST ${usersEndpoint}`, async () => {
    const newUser = {
      name: 'test',
      age: 30,
      email: 'test.me@test.com',
      password: '12345678'
    }

    const response = await request(app).post(usersEndpoint).send(newUser)
    expect(response.status).toBe(201)
  })
})
