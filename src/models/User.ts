import mongoose, { Document }  from 'mongoose'
import validator from 'validator'

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

export interface IUser {
  name: string
  age: number
  email: string
  password: string
}

export interface IUserDocument extends Document, IUser {}

export default mongoose.model<IUserDocument>('User', UserSchema)
