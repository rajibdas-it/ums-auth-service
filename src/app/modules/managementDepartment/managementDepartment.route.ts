import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { managementDepartmentController } from './managementDepartment.controller';
import { managementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create-management-department',
  validateRequest(
    managementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  managementDepartmentController.createManagementDepartment,
);
router.get(
  '/:id',
  managementDepartmentController.getSingleManagementDepartment,
);
router.delete(
  '/delete-management/:id',
  managementDepartmentController.deleteManagementDepartment,
);
router.patch(
  '/update-management/:id',
  validateRequest(
    managementDepartmentValidation.updateManagementDepartmentZodSchema,
  ),
  managementDepartmentController.updateManagementDepartment,
);
router.get('/', managementDepartmentController.getAllManagementDepartment);
export const managementDepartmentRoutes = router;
