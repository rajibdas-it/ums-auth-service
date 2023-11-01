import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helper/calculatePagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { managementDepartmentSearchableFields } from './managementDepartment.constant';
import {
  IManagementDepartment,
  IManagementDepartmentSearch,
} from './managementDepartment.interface';
import ManagementDepartment from './managementDepartment.model';

const createManagementDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getAllManagementDepartment = async (
  filters: IManagementDepartmentSearch,
  options: IPaginationOptions,
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { page, limit, sortBy, sortOrder, skip } = calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: managementDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const sortConditon: { [key: string]: SortOrder } = {};

  sortConditon[sortBy] = sortOrder;

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditon)
    .limit(limit)
    .skip(skip);
  const total = await ManagementDepartment.count(whereConditions);
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getSingleManagementDepartment = async (
  id: string,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOne({ _id: id });
  return result;
};
const deleteManagementDepartment = async (
  id: string,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndDelete({ _id: id });
  return result;
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const managementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  deleteManagementDepartment,
  updateManagementDepartment,
};
