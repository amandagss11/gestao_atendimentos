// src/routes/userRoutes.js
import { Router } from 'express';
import { createUser, listUsers, getUserById /*, updateUser, deleteUser*/ } from '../controllers/userController.js'; 

const router = Router();

// Rotas CRUD para Usuários
router.route('/users')
    .get(listUsers) 
    .post(createUser);

router.route('/users/:id')
    .get(getUserById);
    // .put(updateUser) 
    // .delete(deleteUser); 

export default router;