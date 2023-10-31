import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import { studentService } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
  const filtersData = pick(req.query, studentFilterableFields);
  const paginationData = pick(req.query, paginationsFields);
  const result = await studentService.getAllStudents(
    paginationData,
    filtersData,
  );
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All student retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentService.getSingleStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data retrived successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await studentService.updateStudent(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data update successfully',
    data: result,
  });
});

export const studentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
};
