import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
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
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  academicFacultyController.getAllAcademicFaculty,
);

export const academicFacultyRoutes = router;
