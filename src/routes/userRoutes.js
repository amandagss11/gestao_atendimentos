import { Router } from 'express';
import { createUser, listUsers, getUserById  } from '../controllers/userController.js'; 

const router = Router();

router.route('/users')
    .get(listUsers) 
    .post(createUser);

router.route('/users/:id')
    .get(getUserById);
    

export default router;