import { Model } from 'mongoose';
export type IAcademicFaculty = {
  name: string;
};

export type IAcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;

export type IAcademicFacultyFilters = {
  searchTerm?: string;
};
