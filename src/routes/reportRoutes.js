// src/routes/reportRoutes.js
import { Router } from 'express';
import { exportAttendancesToCSV } from '../controllers/reportController.js'; 

const router = Router();

// Rota para exportar dados (GET /api/reports/attendances-csv?...)
router.get('/reports/attendances-csv', exportAttendancesToCSV); 

export default router;