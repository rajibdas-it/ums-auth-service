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
const getSingleAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await adminService.getSingleAdmin(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin info retrived',
    data: result,
  });
});
const updateAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await adminService.updateAdmin(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin info update successfully',
    data: result,
  });
});
const deleteAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await adminService.deleteAdmin(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin delete successfully',
    data: result,
  });
});

export const adminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
