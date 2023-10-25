import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const academicFacultydata = req.body;
    const result =
      await academicFacultyService.createAcademicFaculty(academicFacultydata);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Created Successfully',
      data: result,
    });
  },
);

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationsFields);
  // console.log(paginationOptions);
  const result =
    await academicFacultyService.getAllAcademicFaculty(paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all academic faculty retrived successfully',
    meta: result.meta,
    data: result.data,
    // data: result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
};
