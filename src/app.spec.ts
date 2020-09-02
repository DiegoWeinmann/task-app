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

const create = <T>(endpoint: string) => async (resource: any) => {
  const response = await request(app).post(endpoint).send(resource)
  return response.body as T
}
const createUser = create<IUserDocument>(usersEndpoint)
const createTask = create<ITaskDocument>(tasksEndpoint)

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
    const postResponse = await request(app).post(usersEndpoint).send(newUser)
    expect(postResponse.status).toBe(201)
    expect(postResponse.body.name).toBe(newUser.name)
    expect(postResponse.body.age).toBe(newUser.age)
    expect(postResponse.body.email).toBe(newUser.email)
    expect(postResponse.body.password).not.toBeDefined()
  })

  test(`GET ${usersEndpoint} -> 200`, async () => {
    const createdUser = await createUser(newUser)

    const getResponse = await request(app).get(usersEndpoint)
    expect(getResponse.body).toBeDefined()
    expect(Array.isArray(getResponse.body)).toBeTruthy()
    expect(getResponse.body[0]._id).toBe(createdUser._id)
  })

  test(`GET ${usersEndpoint}/:id -> 200`, async () => {
    const createdUser = await createUser(newUser)

    const getResponse = await request(app).get(
      `${usersEndpoint}/${createdUser._id}`
    )
    expect(typeof getResponse.body).toBeDefined()
    expect(getResponse.body._id).toBe(createdUser._id)
  })

  test(`GET ${usersEndpoint}/:id -> 404 Not Found`, async () => {
    const objectId = new ObjectID()

    const getResponse = await request(app).get(`${usersEndpoint}/${objectId}`)
    expect(getResponse.status).toBe(404)
    expect(getResponse.body.success).toBe(false)
    expect(getResponse.body.error).toBe('User not found')
  })

  test(`PATCH ${usersEndpoint}/:id -> 200`, async () => {
    const createdUser = await createUser(newUser)
    const newName = 'test updated name'

    const patchResponse = await request(app)
      .patch(`${usersEndpoint}/${createdUser._id}`)
      .send({ name: newName })
    expect(patchResponse.status).toBe(200)
    expect(patchResponse.body.name).toBe(newName)
  })

  test(`PATCH ${usersEndpoint}/:id -> 404 Not found`, async () => {
    const userId = new ObjectID()

    const patchResponse = await request(app)
      .patch(`${usersEndpoint}/${userId}`)
      .send({ name: 'new name' })
    expect(patchResponse.status).toBe(404)
    expect(patchResponse.body.success).toBe(false)
    expect(patchResponse.body.error).toBe('User not found')
  })

  test(`PATCH ${usersEndpoint}/:id -> 400 Invalid update`, async () => {
    const createdUser = await createUser(newUser)

    const invalidUpdate = { _id: 'test', name: 'test' }
    const patchResponse = await request(app)
      .patch(`${usersEndpoint}/${createdUser._id}`)
      .send(invalidUpdate)
    expect(patchResponse.status).toBe(400)
    expect(patchResponse.body.success).toBe(false)
    expect(patchResponse.body.error).toBe('Attemped to update an invalid field')
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
    const createdTask = await createTask(newTask)

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
    const createdTask = await createTask(tasksEndpoint)

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

  test(`PATCH ${tasksEndpoint}/:id -> 200`, async () => {
    const createdTask = await createTask(newTask)
    const completedUpdate = true

    const patchResponse = await request(app)
      .patch(`${tasksEndpoint}/${createdTask._id}`)
      .send({ completed: completedUpdate })
    expect(patchResponse.status).toBe(200)
    expect(patchResponse.body.completed).toBe(completedUpdate)
  })

  test(`PATCH ${tasksEndpoint}/:id -> 404 Not found`, async () => {
    const taskId = new ObjectID()

    const patchResponse = await request(app)
      .patch(`${tasksEndpoint}/${taskId}`)
      .send({ completed: true })
    expect(patchResponse.status).toBe(404)
    expect(patchResponse.body.success).toBe(false)
    expect(patchResponse.body.error).toBe('Task not found')
  })

  test(`PATCH ${tasksEndpoint}/:id -> 400 Invalid update`, async () => {
    const createdTask = await createTask(newTask)

    const invalidUpdate = { _id: 'test', description: 'test' }
    const patchResponse = await request(app)
      .patch(`${usersEndpoint}/${createdTask._id}`)
      .send(invalidUpdate)
    expect(patchResponse.status).toBe(400)
    expect(patchResponse.body.success).toBe(false)
    expect(patchResponse.body.error).toBe('Attemped to update an invalid field')
  })
})
