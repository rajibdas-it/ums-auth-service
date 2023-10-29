import { Schema } from 'mongoose';

const studentSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
    },
    gender: { type: String, enum: ['male', 'female'], required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    parmanentAddress: { type: String, required: true },
    bloodGroup: { type: String, enum: ['A+', 'B+', 'AB+', 'AB-', 'A-', 'B-'] },
    guardian: {
      type: {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        fatherContactNo: { type: String, required: true },
        motherName: { type: String, required: true },
        motherOccupation: { type: String, required: true },
        motherContactNo: { type: String, required: true },
      },
    },
    localGuardian: {
      type: {
        guardianName: { type: String, required: true },
        guardianOccupation: { type: String, required: true },
        guardianContactNo: { type: String, required: true },
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
