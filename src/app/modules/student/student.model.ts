import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from '../../../constants/user';
import { IStudent, IStudentModel } from './student.interface';

const studentSchema = new Schema<IStudent, IStudentModel>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
      required: true,
    },
    gender: { type: String, enum: gender, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    parmanentAddress: { type: String, required: true },
    bloodGroup: { type: String, enum: bloodGroup, required: true },
    guardian: {
      type: {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        fatherContactNo: { type: String, required: true },
        motherName: { type: String, required: true },
        motherOccupation: { type: String, required: true },
        motherContactNo: { type: String, required: true },
      },
      required: true,
    },
    localGuardian: {
      type: {
        guardianName: { type: String, required: true },
        guardianOccupation: { type: String, required: true },
        guardianContactNo: { type: String, required: true },
      },
      required: true,
    },
    profileImage: { type: String },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Student = model<IStudent, IStudentModel>('Student', studentSchema);

export default Student;
