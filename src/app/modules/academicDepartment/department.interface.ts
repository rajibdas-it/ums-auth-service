import { Model, Types } from 'mongoose';

export type IAcademicDepartment = {
  name: string;
  academicFaculty: Types.ObjectId;
};

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;

export type IAcademicDepartmentFilter = {
  searchTerm?: string;
};
