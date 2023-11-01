import express from 'express';
import { departmentRoutes } from '../modules/academicDepartment/department.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { semesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { adminRoutes } from '../modules/admin/admin.route';
import { managementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const routes = [
  { pathName: '/user/', routeName: userRoutes },
  { pathName: '/academic-semester/', routeName: semesterRoutes },
  { pathName: '/academic-faculty/', routeName: academicFacultyRoutes },
  { pathName: '/academic-department/', routeName: departmentRoutes },
  {
    pathName: '/management/',
    routeName: managementDepartmentRoutes,
  },
  { pathName: '/student/', routeName: studentRoutes },
  { pathName: '/admin/', routeName: adminRoutes },
];

routes.forEach(route => {
  router.use(route.pathName, route.routeName);
});

export const ums_routes = router;
