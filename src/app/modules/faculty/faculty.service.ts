/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helper/calculatePagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import User from '../user/user.model';
import { facultiesSearchableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import Faculty from './faculty.model';

const getAllFaculties = async (
  filters: IFacultyFilters,
  options: IPaginationOptions,
): Promise<IGenericResponse<IFaculty[]>> => {
  const { page, limit, sortBy, sortOrder, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: facultiesSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (filterData && Object.keys(filterData).length > 0) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const sortConditon: { [key: string]: SortOrder } = {};
  sortConditon[sortBy] = sortOrder;
  const result = await Faculty.find(whereCondition)
    .sort(sortConditon)
    .limit(limit)
    .skip(skip);
  const total = await Faculty.count(whereCondition);
  return { meta: { page, limit, total }, data: result };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id });
  return result;
};

const updateFaculty = async (id: string, payload: Partial<IFaculty>) => {
  const { name, ...facultyData } = payload;

  const updatedFacultyData = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      //   console.log('name kYe', nameKey);
      //   console.log('value', name[key]);
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });

    const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
      new: true,
    });
    return result;
  }
  //   console.log('finalobject', updatedFacultyData);
};

const deleteFaculty = async (id: string): Promise<IFaculty> => {
  const isExist = await Faculty.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }
  const session = await mongoose.startSession();

  try {
    await session.startTransaction();
    const facultyData = await Faculty.findOneAndDelete({ id }, { session });
    if (!facultyData) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    const userData = await User.findOneAndDelete({ id }, { session });
    if (!userData) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    await session.commitTransaction();
    await session.endSession();
    return facultyData;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const facultiesService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
