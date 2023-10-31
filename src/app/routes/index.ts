import express from 'express';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { semesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { departmentRoutes } from '../modules/department/department.route';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const routes = [
  { pathName: '/user/', routeName: userRoutes },
  { pathName: '/academic-semester/', routeName: semesterRoutes },
  { pathName: '/academic-faculty/', routeName: academicFacultyRoutes },
  { pathName: '/department/', routeName: departmentRoutes },
  { pathName: '/student/', routeName: studentRoutes },
];

routes.forEach(route => {
  router.use(route.pathName, route.routeName);
});

export const ums_routes = router;
