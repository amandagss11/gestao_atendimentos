// src/routes/attendanceTypeRoutes.js
import { Router } from 'express';
import { 
    createAttendanceType, 
    listAttendanceTypes, 
    getAttendanceTypeById, 
    updateAttendanceType, 
    deleteAttendanceType
} from '../controllers/attendanceTypeController.js'; 

const router = Router();

// Rotas CRUD para Tipos de Atendimento
router.route('/attendance-types')
    .get(listAttendanceTypes) 
    .post(createAttendanceType); 

router.route('/attendance-types/:id')
    .get(getAttendanceTypeById) 
    .put(updateAttendanceType) 
    .delete(deleteAttendanceType); 

export default router;