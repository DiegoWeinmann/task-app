import mongoose from 'mongoose'
import validator from 'validator'
import { IUserDocument } from './types.d'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate: {
      validator: (value: number) => value > 0,
      message: 'Age must be a positive number.'
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Please provide a valid email.'
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [7, 'Password must be at least 6 characters long.'],
    validate: {
      validator: (value: string) => !value.toLowerCase().includes('password'),
      message: 'Password can not contain the word "password"'
    }
  }
})

UserSchema.pre<IUserDocument>('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  return next()
})

export default mongoose.model<IUserDocument>('User', UserSchema)
