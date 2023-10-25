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
router.get('/:id', academicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/update-academic-faculty/:id',
  validateRequest(academicFacultyZodSchema.updateAcademicFacultyZodSchema),
  academicFacultyController.updateAcademicFaculty,
);
router.delete(
  '/delete-academic-faculty/:id',
  academicFacultyController.deleteAcademicFaculty,
);
router.get('/', academicFacultyController.getAllAcademicFaculty);

export const academicFacultyRoutes = router;
