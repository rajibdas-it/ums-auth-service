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

export const academicSemesterServices = {
  createSemester,
};
