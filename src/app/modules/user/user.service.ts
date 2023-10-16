import { IUser } from './user.interface'
import User from './user.model'

const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload)

  if (!result) {
    throw new Error('failed to create user')
  }
  return result
}

export const userService = {
  createUser,
}
