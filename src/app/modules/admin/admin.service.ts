/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helper/calculatePagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import Faculty from '../faculty/faculty.model';
import User from '../user/user.model';
import { adminSearchableFields } from './admin.constant';
import { IAdmin, IAdminFieldFilters } from './admin.interface';
import Admin from './admin.model';

const getAllAdmin = async (
  options: IPaginationOptions,
  filters: IAdminFieldFilters,
) => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (filtersData && Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const sortCondition: { [key: string]: SortOrder } = {};

  sortCondition[sortBy] = sortOrder;

  const result = await Admin.find(whereCondition)
    .sort(sortCondition)
    .limit(limit)
    .skip(skip);

  const total = await Faculty.count();
  return {
    meta: { page, limit, total },
    data: result,
  };
};
const getSingleAdmin = async (id: string) => {
  const result = await Admin.findOne({ id });
  return result;
};
const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  const { name, ...updatedData } = payload;

  const updatedAdminData: Partial<IAdmin> = { ...updatedData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  });
  return result;
};
const deleteAdmin = async (id: string) => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'no admin found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deleteAdmin = await Admin.findOneAndDelete({ id }, { session });
    if (!deleteAdmin) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
    }
    await User.deleteOne({ id });
    await session.commitTransaction();
    await session.endSession();
    return deleteAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const adminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
