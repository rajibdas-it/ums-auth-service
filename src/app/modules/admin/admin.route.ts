import express from 'express';
import { adminController } from './admin.controller';

const router = express.Router();

router.get('/:id', adminController.getSingleAdmin);
router.patch('/update-admin/:id', adminController.updateAdmin);
router.delete('/delete-admin/:id', adminController.deleteAdmin);
router.get('/', adminController.getAllAdmin);

export const adminRoutes = router;
