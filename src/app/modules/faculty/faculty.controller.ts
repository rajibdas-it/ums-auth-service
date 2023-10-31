import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultiesFilterableFields } from './faculty.constant';
import { facultiesService } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
  const filters = pick(req.query, facultiesFilterableFields);
  const paginationOptions = pick(req.query, paginationsFields);
  const result = await facultiesService.getAllFaculties(
    filters,
    paginationOptions,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All faculties data retrived',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await facultiesService.getSingleFaculty(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data retrived',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await facultiesService.updateFaculty(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All faculties data retrived',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await facultiesService.deleteFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete faculty successfully',
    data: result,
  });
});

export const facultiesController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
