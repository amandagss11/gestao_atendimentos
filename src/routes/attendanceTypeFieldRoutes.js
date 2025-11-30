import { Router } from 'express';
import { 
    createAttendanceTypeField, 
    listAttendanceTypeFields, 
} from '../controllers/attendanceTypeFieldController.js'; 

const router = Router();

router.route('/type-fields')
    .get(listAttendanceTypeFields) 
    .post(createAttendanceTypeField); 


export default router;