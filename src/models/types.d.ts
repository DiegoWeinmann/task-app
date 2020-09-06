import { Document } from 'mongoose'

export interface IUser {
  name: string
  age: number
  email: string
  password: string
}

export interface ITask {
  description: string
  completed?: boolean
}

export interface IUserDocument extends IUser, Document {}
export interface ITaskDocument extends ITask, Document {}
