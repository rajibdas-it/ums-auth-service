import { Model } from 'mongoose';

export type IAcademicSemester = {
  title: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  syncId: string;
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

export type IAcademicSemesterCreatedEvent = {
  title: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  id: string;
};
