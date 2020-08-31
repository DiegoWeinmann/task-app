import mongoose from 'mongoose'
import { logger } from '../utils/logger'

const MONGO_URI = 'mongodb://localhost:27017'

if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(`${MONGO_URI}/task-manager-api`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(c => {
      logger.info(
        `Mongodb connected mongodb://${c.connection.host}:${c.connection.port}/${c.connection.name}`
      )
    })
    .catch(err => {
      logger.error(err)
    })
} else {
  logger.info(mongoose.connection.readyState)
}
