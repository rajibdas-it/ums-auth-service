import { config } from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser> => {
  const academicSemester = {
    year: '2024',
    code: '01',
  };
  const id = await generateStudentId(academicSemester);
  user.id = id;

  if (!user.password) {
    user.password = config.default_password as string;
  }
  const result = await User.create(user);

  if (!result) {
    throw new ApiError(400, 'failed to create user');
  }
  return result;
};

export const userService = {
  createUser,
};
