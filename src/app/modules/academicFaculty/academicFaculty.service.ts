import { IAcademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFaculty = async (filters, paginationOptions) => {};

export const academicFacultyService = {
  createAcademicFaculty,
  getAllAcademicFaculty,
};
