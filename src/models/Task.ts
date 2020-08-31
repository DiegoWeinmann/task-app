import mongoose, {Document} from 'mongoose'

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

interface ITask {
  description: string
  completed: boolean
}

interface ITaskDocument extends ITask, Document {}

export default mongoose.model<ITaskDocument>('Task', TaskSchema)
