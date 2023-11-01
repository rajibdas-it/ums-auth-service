import { Model } from 'mongoose';

export type IManagementDepartment = {
  title: string;
};

export type IManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, never>
>;

export type IManagementDepartmentSearch = {
  searchTerm?: string;
  title?: string;
};
