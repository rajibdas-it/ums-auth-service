import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { config } from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helper/jwtHelpers';

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authorized');
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.access_token as Secret,
      );
      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
