import express from 'express';
import { facultiesController } from './faculty.controller';

const router = express.Router();

router.get('/:id', facultiesController.getSingleFaculty);
router.patch('/update-faculty/:id', facultiesController.updateFaculty);
router.delete('/delete-faculty/:id', facultiesController.deleteFaculty);
router.get('/', facultiesController.getAllFaculties);

export const facultyRoutes = router;
