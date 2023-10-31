import { IFacultyDesignation } from './faculty.interface';

export const designation: IFacultyDesignation[] = [
  'Professor',
  'Assistant Professor',
  'Associate Professor',
  'Lecturer',
];

export const facultiesFilterableFields = [
  'searchTerm',
  'id',
  'gender',
  'email',
  'contactNo',
  'emergencyContactNo',
  'bloodGroup',
];

export const facultiesSearchableFields = [
  'id',
  'email',
  'contactNo',
  'name.firstName',
  'name.lastName',
];
