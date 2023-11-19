import mongoose, { Schema, model } from 'mongoose'

const taskSchema = new Schema({
  title: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true
  },
  desc: {
    type: String,
    minLength: 1,
    maxLength: 150,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

const TaskModelSchema = model('Task', taskSchema)

export default TaskModelSchema
