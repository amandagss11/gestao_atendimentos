// src/routes/attendanceRoutes.js
import { Router } from 'express';
import { 
    createAttendance, 
    listAttendances, 
    // getAttendanceById, 
    // updateAttendance, 
    // deleteAttendance 
} from '../controllers/attendanceController.js'; 

const router = Router();

// Rotas CRUD para Lançamentos de Atendimento
router.route('/attendances')
    .get(listAttendances) 
    .post(createAttendance); 

// Adicione as rotas por ID aqui

export default router;