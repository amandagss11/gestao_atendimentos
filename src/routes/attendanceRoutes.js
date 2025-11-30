import { Router } from 'express';
import { 
    createAttendance, 
    listAttendances,  
} from '../controllers/attendanceController.js'; 

const router = Router();

router.route('/attendances')
    .get(listAttendances) 
    .post(createAttendance); 


export default router;