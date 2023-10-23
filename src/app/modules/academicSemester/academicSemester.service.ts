import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
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

type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};
const getAllSemester = async (options: IPaginationOptions) => {
  const { page, limit, sortBy, sortOrder } = options;
  const skip = (page - 1) * limit;
  const result = await AcademicSemester.find({}).limit(limit).skip(skip);
  const total = await AcademicSemester.count();

  const meta = {
    page,
    limit,
    total,
  };
  return {
    meta,
    result,
  };
};

export const academicSemesterServices = {
  createSemester,
  getAllSemester,
};
