import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessages } from '../interfaces/ErrorMessages';
import { IGenericErrorResponse } from '../interfaces/common';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const statusCode = 400;
  const errors: IGenericErrorMessages[] = error.issues.map(
    (issue: ZodIssue) => {
      //   console.log(issue.path[issue.path.length - 1]);
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    },
  );
  return {
    statusCode,
    message: 'ZodError',
    errorMessage: errors,
  };
};

export default handleZodError;
