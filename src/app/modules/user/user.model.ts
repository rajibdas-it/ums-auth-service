/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { config } from '../../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    needPasswordChange: { type: Boolean, default: false },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.statics.isUserExist = async function (id: string) {
  return await User.findOne(
    { id },
    { _id: 0, id: 1, role: 1, needPasswordChange: 1, password: 1 },
  );
};

userSchema.statics.isPasswordMatched = function (
  givenPassword: string,
  savedPassword: string,
) {
  return bcrypt.compare(givenPassword, savedPassword);
};

const User = model<IUser, UserModel>('User', userSchema);

export default User;
