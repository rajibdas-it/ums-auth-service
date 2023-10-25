import { z } from 'zod';

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Academic Faculty name required' }),
  }),
});

export const academicFacultyZodSchema = {
  createAcademicFacultyZodSchema,
};
