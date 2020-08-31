import mongoose from 'mongoose'
import User from './User'
import { wrapAsync } from '../utils/wrapAsync'

const successCase = {
  name: 'test',
  age: 30,
  email: 'test@test.com',
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
    await mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
  })

  beforeEach(async () => {
    await User.deleteMany({})
  })

  afterAll(() => {
    mongoose.connection.db.dropDatabase()
    mongoose.connection.close()
  })

  it('should create a user', async () => {
    const user = await User.create(successCase)

    expect(user.name).toBe(successCase.name)
    expect(user.age).toBe(successCase.age)
    expect(user.email).toBe(successCase.email)
    expect(user.password).toBe(successCase.password)
    expect(user).toHaveProperty('_id')
  })

  it('should validate that a password has more than 6 characters long', async () => {
    const { error } = await wrapAsync(User.create(failCaseShortPassword))

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.password).toBeDefined()
    expect(error.errors.password.message).toBe(
      'Password must be at least 6 characters long.'
    )
  })

  it('should validate that the password doesnt contain the word "password"', async () => {
    const { error } = await wrapAsync(User.create(failCaseWrongPassword))

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.password).toBeDefined()
    expect(error.errors.password.message).toBe(
      'Password can not contain the word "password"'
    )
  })
})
