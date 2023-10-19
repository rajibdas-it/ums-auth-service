import { IAcademicSemester } from './academicSemeter.interface';
import AcademicSemester from './academicSemeter.model';

const createSemester = async (
  paylaod: IAcademicSemester,
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(paylaod);
  return result;
};

export const academicSemesterServices = {
  createSemester,
};
