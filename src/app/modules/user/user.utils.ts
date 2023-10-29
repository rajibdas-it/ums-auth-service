import { ENUM_USER_ROLE } from '../../../enums/user';
import { IAcademicSemester } from '../academicSemester/academicSemeter.interface';
import User from './user.model';

const findLastStudentId = async () => {
  const lastUser = await User.findOne(
    { role: ENUM_USER_ROLE.STUDENT },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester,
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let incrementId = (Number(currentId.substring(4)) + 1)
    .toString()
    .padStart(5, '0');
  incrementId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementId}`;
  // console.log(incrementId);
  return incrementId;
};

export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    { role: ENUM_USER_ROLE.FACULTY },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  // console.log(lastFaculty?.id);
  return lastFaculty?.id;
};

export const generateFacultyId = async () => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  // const splitingId = currentId.split('-');
  // let incrementId = (Number(splitingId[1]) + 1).toString().padStart(5, '0');

  let incrementId = (Number(currentId.substring(2)) + 1)
    .toString()
    .padStart(5, '0');
  incrementId = `F-${incrementId}`;
  return incrementId;
};
