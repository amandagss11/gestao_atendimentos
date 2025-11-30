import { Router } from 'express';
import { 
    createProfile, 
    listProfiles, 
    getProfileById, 
    updateProfile, 
    deleteProfile 
} from '../controllers/profileController.js'; 

const router = Router();

router.route('/profiles')
    .get(listProfiles) 
    .post(createProfile); 

router.route('/profiles/:id')
    .get(getProfileById) 
    .put(updateProfile) 
    .delete(deleteProfile); 

export default router;