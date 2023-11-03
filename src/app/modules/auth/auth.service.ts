/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { config } from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import User from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
} from './auth.interface';

import bcrypt from 'bcrypt';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist?.password as string,
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Password does not matched');
  }

  const accessToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.access_token as Secret,
    config.jwt.access_token_expires_in as string,
  );
  const refreshToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_token_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: isUserExist?.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { id, role } = verifiedToken;
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
  }
  const newAccessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.access_token as Secret,
    config.jwt.access_token_expires_in as string,
  );
  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const isUserExist = await User.isUserExist(user?.id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    oldPassword,
    isUserExist?.password as string,
  );

  if (!isPasswordMatched) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Old passwrod does not matched',
    );
  }

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round),
  );
  const updatedData = {
    needPasswordChange: false,
    passwordChangeAt: new Date(),
    password: newHashedPassword,
  };

  // eslint-disable-next-line no-unused-vars
  const result = await User.findOneAndUpdate({ id: user?.id }, updatedData);
};

export const authService = {
  loginUser,
  refreshToken,
  changePassword,
};
