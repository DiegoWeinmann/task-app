import mongoose from 'mongoose'

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

export default mongoose.model('Task', TaskSchema)
