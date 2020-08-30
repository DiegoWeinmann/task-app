import express from 'express'
import { logger } from './utils/logger'
import './db/mongoose'


const app = express()
const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`)
})
