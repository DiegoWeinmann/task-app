import mongoose from 'mongoose'
import { logger } from '../utils/logger'

const MONGO_URI = 'mongodb://localhost:27017'

mongoose
  .connect(`${MONGO_URI}/task-manager-api`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(c => {
    logger.info('Mongodb connected.')
  })
  .catch(err => {
    logger.error(err)
  })
