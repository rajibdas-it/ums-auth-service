import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { managementDepartmentController } from './managementDepartment.controller';
import { managementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create-management-department',
  validateRequest(
    managementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  managementDepartmentController.createManagementDepartment,
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  managementDepartmentController.getSingleManagementDepartment,
);
router.delete(
  '/delete-management/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  managementDepartmentController.deleteManagementDepartment,
);
router.patch(
  '/update-management/:id',
  validateRequest(
    managementDepartmentValidation.updateManagementDepartmentZodSchema,
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  managementDepartmentController.updateManagementDepartment,
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  managementDepartmentController.getAllManagementDepartment,
);
export const managementDepartmentRoutes = router;
