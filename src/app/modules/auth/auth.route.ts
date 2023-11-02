import express from 'express';
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

export const authRoutes = router;
