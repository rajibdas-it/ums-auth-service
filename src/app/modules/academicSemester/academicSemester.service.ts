import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helper/calculatePagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicSemesterMapper } from './academicSemeter.constant';
import { IAcademicSemester } from './academicSemeter.interface';
import AcademicSemester from './academicSemeter.model';

const createSemester = async (
  paylaod: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterMapper[paylaod.title] != paylaod.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'title and code not matched');
  }
  const result = await AcademicSemester.create(paylaod);
  return result;
};

const getAllSemester = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip } = calculatePagination(paginationOptions);

  const result = await AcademicSemester.find({}).skip(skip).limit(limit);
  const total = await AcademicSemester.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const academicSemesterServices = {
  createSemester,
  getAllSemester,
};
