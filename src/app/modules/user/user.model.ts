import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, Record<string, unknown>>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    // facultyId: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    // adminId: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const User = model<IUser, UserModel>('User', userSchema);

export default User;
