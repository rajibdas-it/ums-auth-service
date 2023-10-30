/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { config } from '../../../config';
import ApiError from '../../../errors/ApiError';
import AcademicSemester from '../academicSemester/academicSemeter.model';
import { IStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { IUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';

const createStudent = async (student: IStudent, user: IUser) => {
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById({
    _id: student.academicSemester,
  });

  const session = await mongoose.startSession();

  let userAllData = null;

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

    userAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }

  // console.log('From Service Page', userAllData);

  // if (userAllData) {
  //   userAllData = await User.findOne({ id: userAllData.id }).populate({
  //     path: 'student',
  //     populate: [
  //       { path: 'academicSemester' },
  //       { path: 'academicFaculty' },
  //       { path: 'academicDepartment', populate: { path: 'academicFaculty' } },
  //     ],
  //   });
  // }
  if (userAllData) {
    userAllData = await User.findOne({ id: userAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicFaculty' },
        { path: 'academicDepartment' },
      ],
    });
  }
  // console.log('after populate', userAllData);
  return userAllData;
};

export const userService = {
  createUser: createStudent,
};
