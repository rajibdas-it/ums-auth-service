import express from 'express';
import { facultiesController } from './faculty.controller';

const router = express.Router();

router.get('/', facultiesController.getAllFaculties);

export const facultyRoutes = router;
