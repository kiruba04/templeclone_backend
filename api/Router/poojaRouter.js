import express from 'express';
import {
  addPooja,
  getAllPoojas,
  getPoojaById,
  updatePooja,
  deletePooja,
} from '../controller/poojaController.js';
import authenticateAdmin from '../utils/authMiddleware.js';

const router = express.Router();

// Routes that require admin authentication
router.post('/', authenticateAdmin, addPooja);
router.put('/:id', authenticateAdmin, updatePooja);
router.delete('/:id', authenticateAdmin, deletePooja);

// Public routes
router.get('/', getAllPoojas);
router.get('/:id', getPoojaById);

export default router;
