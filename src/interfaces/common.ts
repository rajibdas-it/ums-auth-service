import { IGenericErrorMessages } from './ErrorMessages'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessage: IGenericErrorMessages[]
}
