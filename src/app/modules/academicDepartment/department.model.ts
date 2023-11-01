import { Schema, model } from 'mongoose';
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from './department.interface';

const academicDepartmentSchema = new Schema<
  IAcademicDepartment,
  IAcademicDepartmentModel
>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const AcademicDepartment = model<IAcademicDepartment, IAcademicDepartmentModel>(
  'AcademicDepartment',
  academicDepartmentSchema,
);

export default AcademicDepartment;
