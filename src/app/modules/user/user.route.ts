import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { userController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createStudentZodSchema),
  userController.createStudent,
);

export const userRoutes = router;
