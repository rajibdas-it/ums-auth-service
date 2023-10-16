import { Model, Schema, model } from 'mongoose'
import { IUser } from './user.interface'

type UserModel = Model<IUser, Record<string, never>>

const userSchema = new Schema<IUser>(
  {
    id: { type: String, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

const User = model<IUser, UserModel>('User', userSchema)

export default User
