/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { config } from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import AcademicSemester from '../academicSemester/academicSemeter.model';
import { IFaculty } from '../faculty/faculty.interface';
import Faculty from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { IUser } from './user.interface';
import User from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';

const createStudent = async (student: IStudent, user: IUser) => {
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById({
    _id: student.academicSemester,
  });

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicFaculty' },
        { path: 'academicDepartment' },
      ],
    });
  }
  return newUserAllData;
};

const createFaculty = async (faculty: IFaculty, user: IUser) => {
  user.role = ENUM_USER_ROLE.FACULTY;
  if (!user.password) {
    user.password = config.default_faculty_password as string;
  }
  let newFacultyData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    user.facultyId = newFaculty[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create new user');
    }

    newFacultyData = newUser[0];
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
  newFacultyData = await User.findOne({ id: newFacultyData.id }).populate({
    path: 'Faculty',
    populate: [{ path: 'academicDepartment' }, { path: 'academicFaculty' }],
  });
  return newFacultyData;
};

export const userService = {
  createStudent,
  createFaculty,
};
