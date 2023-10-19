import { RequestHandler } from 'express';
import { userService } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { ...data } = req.body;
    const result = await userService.createUser(data);

    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createUser,
};
