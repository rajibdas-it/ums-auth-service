import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
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
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationsFields);
  const result = await academicFacultyService.getAllAcademicFaculty(
    filters,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all academic faculty retrived successfully',
    meta: result.meta,
    data: result.data,
    // data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await academicFacultyService.getSingleAcademicFaculty(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Facutly retrived',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await academicFacultyService.updateAcademicFaculty(
    id,
    updateData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Facutly updated successfully',
    data: result,
  });
});

const deleteAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await academicFacultyService.deleteAcademicFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Facutly deleted successfully',
    data: result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
