import mongoose from 'mongoose'
import User from './User'
import { IUserDocument } from './types'
import { wrapAsync } from '../utils/wrapAsync'
import * as TestDB from '../utils/testUtils'

const successCase = {
  name: 'test',
  age: 30,
  email: 'test@test.com',
  password: '1234567'
}

const failCaseAgeUserZero = {
  name: 'test',
  age: -30,
  email: 'test@test.com',
  password: '1234'
}

const failCaseEmail = {
  name: 'test',
  age: 30,
  email: 'testtestcom',
  password: '1234567'
}

const failCaseShortPassword = {
  name: 'test',
  age: 30,
  email: 'test@test.com',
  password: '1234'
}

const failCaseWrongPassword = {
  name: 'test',
  age: 30,
  email: 'test@test.com',
  password: 'password123456'
}

describe('User Model', () => {
  beforeAll(async () => {
    await TestDB.connect()
  })

  beforeEach(async () => {
    await TestDB.clearDatabase()
  })

  afterAll(async () => {
    await TestDB.closeDatabase()
  })
  it('should create a user', async () => {
    const user = await User.create(successCase)
    expect(user.name).toBe(successCase.name)
    expect(user.age).toBe(successCase.age)
    expect(user.email).toBe(successCase.email)
    expect(user).toHaveProperty('_id')
  })

  it('should validate that the age must be a positive number', async () => {
    const [, error] = await wrapAsync<
      IUserDocument,
      mongoose.Error.ValidationError
    >(User.create(failCaseAgeUserZero))
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.age).toBeDefined()
    expect(error.errors.age.message).toBe('Age must be a positive number.')
  })

  it('should validate that the email format is valid', async () => {
    const [, error] = await wrapAsync<
      IUserDocument,
      mongoose.Error.ValidationError
    >(User.create(failCaseEmail))
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.email).toBeDefined()
    expect(error.errors.email.message).toBe('Please provide a valid email.')
  })

  it('should validate that a password has more than 6 characters', async () => {
    const [, error] = await wrapAsync<
      IUserDocument,
      mongoose.Error.ValidationError
    >(User.create(failCaseShortPassword))
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.password).toBeDefined()
    expect(error.errors.password.message).toBe(
      'Password must be at least 6 characters long.'
    )
  })

  it('should validate that the password doesnt contain the word "password"', async () => {
    const [, error] = await wrapAsync<
      IUserDocument,
      mongoose.Error.ValidationError
    >(User.create(failCaseWrongPassword))
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.password).toBeDefined()
    expect(error.errors.password.message).toBe(
      'Password can not contain the word "password"'
    )
  })
})
