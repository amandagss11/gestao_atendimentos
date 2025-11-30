// src/routes/attendanceTypeFieldRoutes.js
import { Router } from 'express';
import { 
    createAttendanceTypeField, 
    listAttendanceTypeFields, 
    // Outros métodos CRUD aqui
} from '../controllers/attendanceTypeFieldController.js'; 

const router = Router();

// Rotas CRUD para Campos Dinâmicos (AttendanceTypeField)
router.route('/type-fields')
    .get(listAttendanceTypeFields) 
    .post(createAttendanceTypeField); 

// Adicionar rotas /type-fields/:id aqui

export default router;