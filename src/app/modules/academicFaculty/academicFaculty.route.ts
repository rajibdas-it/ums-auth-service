import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyZodSchema } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyZodSchema.createAcademicFacultyZodSchema),
  academicFacultyController.createAcademicFaculty,
);

export const academicFacultyRoutes = router;
