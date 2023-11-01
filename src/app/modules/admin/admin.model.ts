import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from '../../../constants/user';
import { IAdmin, IAdminModel } from './admin.interface';

const adminSchema = new Schema<IAdmin, IAdminModel>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      required: true,
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
    },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: gender },

    parmanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    bloodGroup: { type: String, required: true, enum: bloodGroup },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

const Admin = model<IAdmin, IAdminModel>('Admin', adminSchema);

export default Admin;
