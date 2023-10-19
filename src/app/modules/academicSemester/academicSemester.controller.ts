import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const result = await academicSemesterServices.createSemester(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic semester created successfully',
      data: result,
    });
  },
);

export const academicSemesterController = {
  createAcademicSemester,
};
