import { Request, Response } from 'express'
import { userService } from './user.service'

const createUser = async (req: Request, res: Response) => {
  const data = req.body
  const result = await userService.createUser(data)

  res.status(200).json({
    success: true,
    message: 'User Created Successfully',
    data: result,
  })
}

export const userController = {
  createUser,
}
