import express from 'express';
import {
    getAllSpecialPoojas,
    getSpecialPoojaById,
    createSpecialPooja,
    updateSpecialPooja,
    deleteSpecialPooja
} from '../controller/specialPoojaController.js';
import authenticateAdmin from '../utils/authMiddleware.js';


const router = express.Router();

router.get('/', getAllSpecialPoojas);
router.get('/:id', getSpecialPoojaById);
router.post('/',authenticateAdmin, createSpecialPooja);
router.put('/:id',authenticateAdmin, updateSpecialPooja);
router.delete('/:id',authenticateAdmin, deleteSpecialPooja);

export default router;
