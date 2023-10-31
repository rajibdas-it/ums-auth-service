/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helper/calculatePagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { studentSearchableFields } from './student.constant';
import { IStudent, IStudentFilters } from './student.interface';
import Student from './student.model';

const getAllStudents = async (
  options: IPaginationOptions,
  filters: IStudentFilters,
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, sortBy, sortOrder, skip } = calculatePagination(options);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
  const sortCondition: { [key: string]: SortOrder } = {};

  sortCondition[sortBy] = sortOrder;
  const result = await Student.find(whereConditions)
    .sort(sortCondition)
    .limit(limit)
    .skip(skip);
  const total = await Student.count();
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id });
  return result;
};

export const studentService = {
  getAllStudents,
  getSingleStudent,
};
