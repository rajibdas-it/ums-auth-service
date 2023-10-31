import { Model, Types } from 'mongoose';
import { IBloodGroup, IGender } from '../../../interfaces/user';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicDepartment } from '../department/department.interface';

type IFacultyName = {
  firstName: string;
  midleName?: string;
  lastName: string;
};

export type IFacultyDesignation =
  | 'Professor'
  | 'Lecturer'
  | 'Associate Professor'
  | 'Assistant Professor';

export type IFaculty = {
  id: string;
  name: IFacultyName;
  gender: IGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  parmanentAddress: string;
  bloodGroup: IBloodGroup;
  designation: IFacultyDesignation;
  profileImg?: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type IFacultyModel = Model<IFaculty, Record<string, unknown>>;
