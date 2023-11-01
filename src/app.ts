/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { ums_routes } from './app/routes';

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//console.log(app.get('env'))
//console.log(process.env)
app.use('/api/v1/', ums_routes);

//unhandle rejection testing purpose

// app.get('/', async (req, res, next) => {
//   Promise.reject(new Error('Un'));
// });

//uncaught rejection testing purose
// app.get('/', (req, res, next) => {
//   throw new Error('testing error logger');
// });

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
    status: false,
    message: 'API not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'api not found',
      },
    ],
  });
  next();
});

// const academicSemester = {
//   year: '2024',
//   code: '01',
// };
// const testId = async () => {
//   const newId = await generateAdminId();
//   console.log(newId);
// };
// testId();
export default app;
