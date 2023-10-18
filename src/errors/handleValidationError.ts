import mongoose from 'mongoose'
import { IGenericErrorMessages } from '../interfaces/ErrorMessages'
import { IGenericErrorResponse } from '../interfaces/common'

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = Object.values(error.errors).map(
    el => {
      return {
        path: el?.path,
        message: el?.message,
      }
    },
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  }
}

export default handleValidationError
