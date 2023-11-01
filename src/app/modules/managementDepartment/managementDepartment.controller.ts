import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { managementDepartmentService } from './managementDepartment.service';

const createManagementDepartment = catchAsync(async (req, res) => {
  const data = req.body;
  const result =
    await managementDepartmentService.createManagementDepartment(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create new management department',
    data: result,
  });
});

const getAllManagementDepartment = catchAsync(async (req, res) => {
  const filters = pick(req.query, managementDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationsFields);
  const result = await managementDepartmentService.getAllManagementDepartment(
    filters,
    paginationOptions,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All management department data retrived',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleManagementDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await managementDepartmentService.getSingleManagementDepartment(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'management department data retrived',
    data: result,
  });
});

const deleteManagementDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await managementDepartmentService.deleteManagementDepartment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete management department',
    data: result,
  });
});

const updateManagementDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await managementDepartmentService.updateManagementDepartment(
    id,
    data,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update management department successfully',
    data: result,
  });
});

export const managementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  deleteManagementDepartment,
  updateManagementDepartment,
};

//  sendResponse(res, {
//    statusCode: httpStatus.OK,
//    success: true,
//    message: 'Create new management department',
//    data: result,
//  });
