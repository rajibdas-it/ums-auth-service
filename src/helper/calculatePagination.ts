import { SortOrder } from 'mongoose';

type IOtions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
const calculatePagination = (options: IOtions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    skip,
  };
};

export default calculatePagination;
