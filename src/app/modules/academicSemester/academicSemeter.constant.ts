import {
  IAcademicSemesterCode,
  IAcademicSemesterTitle,
  IMonths,
} from './academicSemeter.interface';

export const academicSemesterMonths: IMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitles: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterCodes: IAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
