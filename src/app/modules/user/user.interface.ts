import { Model, Types } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
  studentId?: Types.ObjectId | IStudent;
  // facultyId?: Types.ObjectId | IFaculty;
  // adminId?: Types.ObjectId | IAdmin;
};

export type UserModel = Model<IUser, Record<string, never>>;
