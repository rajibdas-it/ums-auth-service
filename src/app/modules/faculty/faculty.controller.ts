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

export const facultiesController = {
  getAllFaculties,
};
