import { IAcademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

export const academicFacultyService = {
  createAcademicFaculty,
};