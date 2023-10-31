import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helper/calculatePagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { facultiesSearchableFields } from './faculty.constant';
import { IFacultyFilters } from './faculty.interface';
import Faculty from './faculty.model';

const getAllFaculties = async (
  filters: IFacultyFilters,
  options: IPaginationOptions,
) => {
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

export const facultiesService = {
  getAllFaculties,
};
