import { RequestHandler } from 'express';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...data } = req.body;
    const result = await academicSemesterServices.createSemester(data);
    res.status(200).json({
      success: true,
      message: 'academic semester created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const academicSemesterController = {
  createAcademicSemester,
};
