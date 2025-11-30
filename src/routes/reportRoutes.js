import { Router } from 'express';
import { exportAttendancesToCSV } from '../controllers/reportController.js'; 

const router = Router();

router.get('/reports/attendances-csv', exportAttendancesToCSV); 

export default router;