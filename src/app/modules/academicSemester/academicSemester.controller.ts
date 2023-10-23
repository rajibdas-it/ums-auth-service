import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
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

const getAllSemester = catchAsync(async (req, res) => {
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: req.query.sortBy,
  //   sortOrder: req.query.sortOrder,
  // };

  const paginationOptions = pick(req.query, paginationsFields);
  console.log(paginationOptions);
  const result =
    await academicSemesterServices.getAllSemester(paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived ',
    meta: result.meta,
    data: result.result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllSemester,
};
