import mongoose, { Document } from 'mongoose'
import { ITaskDocument } from './types'

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Description field is required']
  },
  completed: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model<ITaskDocument>('Task', TaskSchema)
