import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

export default mongoose.model('Task', TaskSchema)
