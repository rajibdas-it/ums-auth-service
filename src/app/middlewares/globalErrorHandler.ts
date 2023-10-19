/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { errorLogger } from './../../shared/logger';
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { config } from '../../config';
import ApiError from '../../errors/ApiError';
import handleValidationError from '../../errors/handleValidationError';
import { IGenericErrorMessages } from '../../interfaces/ErrorMessages';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  //   res.status(400).json({ error: error })
  config.node_env === 'development'
    ? console.log('Global Error Handler', error)
    : errorLogger.error('Global ErrorHandler', error);

  let statusCode = 500;
  let message = 'something went wrong';
  let errorMessages: IGenericErrorMessages[] = [];

  if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessage;
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error.message }]
      : [];
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.node_env !== 'production' ? error?.stack : undefined,
  });
  next(); //ei next ke rakhtei hobe. noile response shundor vabe dey na.
};

export default globalErrorHandler;
