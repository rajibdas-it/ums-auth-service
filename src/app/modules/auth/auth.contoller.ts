import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;

  const result = await authService.loginUser(loginData);

  // const { refreshToken, ...others } = result;

  // const cookiesOptions = {
  //   secure: config.node_env === 'production',
  //   httpOnly: true,
  // };

  // res.cookie('refreshToken', refreshToken, cookiesOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully logged in',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Receive new access token',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...passwords } = req.body;

  const result = await authService.changePassword(user, passwords);

  // console.log(user, passwords);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});

export const authController = {
  loginUser,
  refreshToken,
  changePassword,
};
