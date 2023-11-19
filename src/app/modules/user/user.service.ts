/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { config } from '../../../config';
import ApiError from '../../../errors/ApiError';
import AcademicSemester from '../academicSemester/academicSemeter.model';
import { IAdmin } from '../admin/admin.interface';
import Admin from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import Faculty from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { IUser } from './user.interface';
import User from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';

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
    await session.startTransaction();
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
    await session.abortTransaction();
    await session.endSession();
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
  if (!user.password) {
    user.password = config.default_faculty_password as string;
  }

  user.role = 'faculty';
  let newFacultyData = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const id = await generateFacultyId();

    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create new user');
    }

    newFacultyData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newFacultyData) {
    newFacultyData = await User.findOne({ id: newFacultyData.id }).populate({
      path: 'faculty',
      populate: [{ path: 'academicFaculty' }, { path: 'academicDepartment' }],
    });
  }

  return newFacultyData;
};

const createAdmin = async (admin: IAdmin, user: IUser) => {
  if (!user.password) {
    user.password = config.default_admin_password as string;
  }
  user.role = 'admin';
  let newUserData = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });
    newUserData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  newUserData = await User.findOne({ id: newUserData.id }).populate({
    path: 'admin',
    populate: [{ path: 'managementDepartment' }],
  });

  return newUserData;
};

export const userService = {
  createStudent,
  createFaculty,
  createAdmin,
};
