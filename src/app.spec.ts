import { ObjectID } from 'mongodb'
import request from 'supertest'
import app from './app'
import * as TestDB from './utils/testUtils'

const usersEndpoint = '/users'

const newUser = {
  name: 'test',
  age: 30,
  email: 'test.me@test.com',
  password: '12345678'
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

  test(`POST ${usersEndpoint}`, async () => {
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

  test(`GET ${usersEndpoint}/:id -> 404`, async () => {
    const objectId = new ObjectID()
    const getResponse = await request(app).get(`${usersEndpoint}/${objectId}`)
    expect(getResponse.body).toStrictEqual({})
    expect(getResponse.status).toBe(404)
  })
})
