import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { adminService } from './admin.service';

const getAllAdmin = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationsFields);
  const result = await adminService.getAllAdmin(paginationOptions, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All admin info retrived',
    meta: result.meta,
    data: result.data,
  });
});

export const adminController = {
  getAllAdmin,
};
