import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { departmentController } from './department.controller';
import { DepartmentZodSchema } from './department.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(DepartmentZodSchema.createDepartmentZodSchema),
  departmentController.createSemester,
);

router.get('/:id', departmentController.getSingleDepartment);
router.patch('/update-department/:id', departmentController.updateDepartment);
router.delete('/delete-department/:id', departmentController.deleteDepartment);
router.get('/', departmentController.getAllDepartment);

export const departmentRoutes = router;
