import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.createAcademicSemester,
);
router.get('/:id', academicSemesterController.getSingleSemeter);
router.patch(
  '/update-semester/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
  academicSemesterController.updateSemester,
);
router.delete(
  '/delete-semester/:id',
  academicSemesterController.deleteSemester,
);

router.get('/', academicSemesterController.getAllSemester);

export const semesterRoutes = router;
