import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helper/calculatePagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import Faculty from '../faculty/faculty.model';
import { adminSearchableFields } from './admin.constant';
import { IAdminFieldFilters } from './admin.interface';
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

export const adminService = {
  getAllAdmin,
};
