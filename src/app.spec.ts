import { ObjectID } from 'mongodb'
import request from 'supertest'
import app from './app'
import * as TestDB from './utils/testUtils'
import { IUserDocument } from './models/User'
import { ITaskDocument } from './models/Task'

const usersEndpoint = '/users'
const tasksEndpoint = '/tasks'

const newUser = {
  name: 'test',
  age: 30,
  email: 'test.me@test.com',
  password: '12345678'
}

const newTask = {
  description: 'testing description'
}

const create = async <T extends object>(endpoint: string, resource: object) => {
  const response = await request(app).post(endpoint).send(resource)
  return response.body as T
}

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

  test(`POST ${usersEndpoint} -> 201`, async () => {
    const response = await request(app).post(usersEndpoint).send(newUser)
    expect(response.status).toBe(201)
    expect(response.body).toBeDefined()
    expect(response.body.name).toBe(newUser.name)
    expect(response.body.age).toBe(newUser.age)
    expect(response.body.email).toBe(newUser.email)
    expect(response.body.password).not.toBeDefined()
  })

  test(`GET ${usersEndpoint} -> 200`, async () => {
    const postResponse = await request(app).post(usersEndpoint).send(newUser)
    const getResponse = await request(app).get(usersEndpoint)
    expect(getResponse.body).toBeDefined()
    expect(Array.isArray(getResponse.body)).toBeTruthy()
    expect(getResponse.body[0]._id).toBe(postResponse.body._id)
  })

  test(`GET ${usersEndpoint}/:id -> 200`, async () => {
    const postResponse = await request(app).post(usersEndpoint).send(newUser)
    const userId = postResponse.body._id
    const getResponse = await request(app).get(`${usersEndpoint}/${userId}`)
    expect(typeof getResponse.body).toBeDefined()
    expect(getResponse.body._id).toBe(userId)
  })

  test(`GET ${usersEndpoint}/:id -> 404 Not Found`, async () => {
    const objectId = new ObjectID()
    const getResponse = await request(app).get(`${usersEndpoint}/${objectId}`)
    expect(getResponse.status).toBe(404)
    expect(getResponse.body.success).toBe(false)
    expect(getResponse.body.error).toBe('User not found')
  })
})

describe(tasksEndpoint, () => {
  beforeAll(() => {
    TestDB.connect()
  })

  afterAll(() => {
    return TestDB.closeDatabase()
  })

  beforeEach(() => {
    return TestDB.clearDatabase()
  })

  test(`POST ${tasksEndpoint} -> 201`, async () => {
    const postResponse = await request(app).post(tasksEndpoint).send(newTask)
    expect(postResponse.status).toBe(201)
    expect(postResponse.body).toBeDefined()
    expect(postResponse.body.description).toBe(newTask.description)
    expect(postResponse.body.completed).toBe(false)
  })

  test(`GET ${tasksEndpoint} -> 200`, async () => {
    const createdTask = await create<ITaskDocument>(tasksEndpoint, newTask)
    const getResponse = await request(app).get(tasksEndpoint)
    const task = getResponse.body[0]
    expect(getResponse.status).toBe(200)
    expect(getResponse.body).toBeDefined()
    expect(Array.isArray(getResponse.body)).toBeTruthy()
    expect(task._id).toBe(createdTask._id)
    expect(task.description).toBe(createdTask.description)
    expect(task.completed).toBe(createdTask.completed)
  })

  test(`GET ${tasksEndpoint}/:id -> 200`, async () => {
    const createdTask = await create<ITaskDocument>(tasksEndpoint, newTask)
    const getResponse = await request(app).get(
      `${tasksEndpoint}/${createdTask._id}`
    )
    expect(getResponse.status).toBe(200)
    expect(getResponse.body).toBeDefined()
    expect(getResponse.body._id).toBe(createdTask._id)
    expect(getResponse.body.description).toBe(createdTask.description)
    expect(getResponse.body.completed).toBe(createdTask.completed)
  })

  test(`GET ${tasksEndpoint}/:id -> 404 Not Found`, async () => {
    const objectId = new ObjectID()
    const getResponse = await request(app).get(`${tasksEndpoint}/${objectId}`)
    expect(getResponse.status).toBe(404)
    expect(getResponse.body.success).toBe(false)
    expect(getResponse.body.error).toBe('Task not found')
  })
})
