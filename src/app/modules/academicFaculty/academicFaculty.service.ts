import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helper/calculatePagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFaculty = async (paginationOptions: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortBy) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicFaculty.find({})
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const academicFacultyService = {
  createAcademicFaculty,
  getAllAcademicFaculty,
};
