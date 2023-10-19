import express from 'express';
import { semesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const routes = [
  { pathName: '/user/', routeName: userRoutes },
  { pathName: '/academic-semester/', routeName: semesterRoutes },
];

routes.forEach(route => {
  router.use(route.pathName, route.routeName);
});

export const ums_routes = router;
