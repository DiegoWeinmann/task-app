import { Response } from 'express'
import { logger } from './logger'

const handleError = (res: Response) => (error: Error) => {
  process.env.NODE_ENV !== 'test' &&
    logger.error(error.message || 'Internal server error')
  return res.status(res.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal server error'
  })
}

export { handleError }
