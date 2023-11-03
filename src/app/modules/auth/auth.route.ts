import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.contoller';
import { authZodSchema } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authZodSchema.loginZodSchema),
  authController.loginUser,
);
router.post(
  '/refresh-token',
  validateRequest(authZodSchema.refreshTokenZodSchema),
  authController.refreshToken,
);
router.post(
  '/change-password',
  validateRequest(authZodSchema.changlePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  authController.changePassword,
);

export const authRoutes = router;
