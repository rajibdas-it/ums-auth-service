import { Model, Types } from 'mongoose';
import { IBloodGroup, IGender } from '../../../interfaces/user';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';
export type IName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  name: IName;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: IGender;
  parmanentAddress: string;
  presentAddress: string;
  bloodGroup: IBloodGroup;
  managementDepartment: Types.ObjectId | IManagementDepartment;
};

export type IAdminModel = Model<IAdmin, Record<string, never>>;

export type IAdminFieldFilters = {
  searchTerm?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: string;
};
