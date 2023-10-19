import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, Record<string, unknown>>(
  {
    id: { type: String, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const User = model<IUser, UserModel>('User', userSchema);

export default User;
