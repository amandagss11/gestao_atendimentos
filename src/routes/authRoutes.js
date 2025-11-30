// src/routes/authRoutes.js
import { Router } from 'express';
import { login } from '../controllers/authController.js'; 

const router = Router();

// Rota de Login
router.post('/login', login); 

export default router;