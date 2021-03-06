import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { logger } from './logger'

const mongod = new MongoMemoryServer()

/**
 * Connect to the in-memory database.
 */
const connect = async () => {
  const uri = await mongod.getUri('test')
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
  // logger.info(`Mongodb test database: ${uri}`)
  await mongoose.connect(uri, mongooseOpts)
}

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
  // logger.info('mongodb closed')
}

/**
 * Remove all the data for all db collections.
 */
const clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

export { connect, closeDatabase, clearDatabase }
