import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { departmentController } from './department.controller';
import { DepartmentZodSchema } from './department.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(DepartmentZodSchema.createDepartmentZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  departmentController.createSemester,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  departmentController.getSingleDepartment,
);
router.patch(
  '/update-department/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  departmentController.updateDepartment,
);
router.delete(
  '/delete-department/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  departmentController.deleteDepartment,
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  departmentController.getAllDepartment,
);

export const departmentRoutes = router;
