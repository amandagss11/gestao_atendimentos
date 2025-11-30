import { Router } from 'express';
import { 
    createAttendanceForm, 
    listAttendanceForms, 
    getAttendanceFormById, 
    updateAttendanceForm, 
    deleteAttendanceForm 
} from '../controllers/attendanceFormController.js'; 

const router = Router();

router.route('/forms')
    .get(listAttendanceForms) 
    .post(createAttendanceForm); 

router.route('/forms/:id')
    .get(getAttendanceFormById) 
    .put(updateAttendanceForm) 
    .delete(deleteAttendanceForm); 

export default router;