import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from '../academicFaculty/academicFaculty.constant';
import { departmentService } from './department.service';

const createSemester = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await departmentService.createDepartment(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department created successfully',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationsFields);
  const filtersData = pick(req.query, academicFacultyFilterableFields);

  const result = await departmentService.getAllDepartment(
    filtersData,
    paginationOptions,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data retrived',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await departmentService.getSingleDepartment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data retrived',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await departmentService.updateDepartment(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data update successfully',
    data: result,
  });
});
const deleteDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await departmentService.deleteDepartment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department deleted successfully',
    data: result,
  });
});

export const departmentController = {
  createSemester,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
