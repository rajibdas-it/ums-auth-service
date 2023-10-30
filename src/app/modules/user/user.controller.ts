import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;

  const result = await userService.createUser(student, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create new successfully',
    data: result,
  });
});

export const userController = {
  createStudent,
};
