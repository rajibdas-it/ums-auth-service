import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { config } from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import User from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordMatched = User.isPasswordMatched(
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

export const authService = {
  loginUser,
  refreshToken,
};
