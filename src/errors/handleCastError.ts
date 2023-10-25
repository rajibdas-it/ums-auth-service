import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { IGenericErrorMessages } from '../interfaces/ErrorMessages';
import { IGenericErrorResponse } from '../interfaces/common';

const handleCastError = (
  error: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = [
    {
      path: error?.path,
      message: 'Invalid ID',
    },
  ];

  const statusCode = httpStatus.NOT_FOUND;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessage: errors,
  };
};

export default handleCastError;
