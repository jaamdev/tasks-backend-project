import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true
  },
  email: {
    type: String,
    minLength: 2,
    maxLength: 255,
    required: true,
    unique: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    minLength: 4,
    maxLength: 255,
    required: true
  }
}, {
  timestamps: true
})

const UserModelSchema = model('User', userSchema)

export default UserModelSchema
