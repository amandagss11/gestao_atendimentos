// src/routes/publicTypeRoutes.js
import { Router } from 'express';
import { 
    createPublicType, 
    listPublicTypes, 
    getPublicTypeById, 
    updatePublicType, 
    deletePublicType 
} from '../controllers/publicTypeController.js'; 

const router = Router();

// Rotas CRUD para Tipos de Público
router.route('/public-types')
    .get(listPublicTypes) 
    .post(createPublicType); 

router.route('/public-types/:id')
    .get(getPublicTypeById) 
    .put(updatePublicType) 
    .delete(deletePublicType); 

export default router;