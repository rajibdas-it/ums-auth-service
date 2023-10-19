/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { userRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//console.log(app.get('env'))
//console.log(process.env)
app.use('/api/v1/user', userRoutes);

//unhandle rejection testing purpose

// app.get('/', async (req, res, next) => {
//   Promise.reject(new Error('Un'));
// });

//uncaught rejection testing purose
// app.get('/', (req, res, next) => {
//   throw new Error('testing error logger');
// });

app.use(globalErrorHandler);

export default app;
