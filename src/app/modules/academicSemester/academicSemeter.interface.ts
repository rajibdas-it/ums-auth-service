import { Model } from 'mongoose';

export type IAcademicSemester = {
  title: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type AcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>;

export type IAcademicSemesterFilters = {
  searchTerm?: string;
};
export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterCode = '01' | '02' | '03';
export type IMonths = string[];
// export type IMonths =
//   | 'January'
//   | 'February'
//   | 'March'
//   | 'April'
//   | 'May'
//   | 'June'
//   | 'July'
//   | 'August'
//   | 'September'
//   | 'October'
//   | 'November'
//   | 'December';
