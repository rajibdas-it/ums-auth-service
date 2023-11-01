import { z } from 'zod';
import { bloodGroup, gender } from '../../../constants/user';
import { designation } from '../faculty/faculty.constant';

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last Name is required' }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Blood Group is required',
      }),
      dateOfBirth: z.string({ required_error: 'Date of Birth is required' }),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string({ required_error: 'Contact no. is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact no. is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      parmanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood Group is required',
      }),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father name is required' }),
        fatherOccupation: z.string({
          required_error: 'Father occupution is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact is required',
        }),
        motherName: z.string({ required_error: 'Mother is required' }),
        motherOccupation: z.string({
          required_error: 'Mother occupution is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact no. is required',
        }),
      }),
      localGuardian: z.object({
        guardianName: z.string({
          required_error: 'Guardian Name is required',
        }),
        guardianOccupation: z.string({
          required_error: 'Guardian Occupution is required',
        }),
        guardianContactNo: z.string({
          required_error: 'Guardian Contact no is required',
        }),
      }),
      profileImage: z.string().optional(),
      academicSemester: z.string({
        required_error: 'Academic Semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
    }),
  }),
});

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last Name is required' }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Blood Group is required',
      }),
      dateOfBirth: z.string({ required_error: 'Date of Birth is required' }),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string({ required_error: 'Contact no. is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact no. is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      parmanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood Group is required',
      }),
      designation: z.enum([...designation] as [string, ...string[]], {
        required_error: 'Designation is required',
      }),

      profileImage: z.string().optional(),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
    }),
  }),
});
const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last name is required' }),
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string({ required_error: 'Date of birth is required' }),
      emergencyContactNo: z.string({
        required_error: 'Date of birth is required',
      }),
      parmanentAddress: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      presentAddress: z.string({ required_error: 'Date of birth is required' }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood group is required',
      }),
      managementDepartment: z.string({
        required_error: 'Date of birth is required',
      }),
    }),
  }),
});
export const userValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
