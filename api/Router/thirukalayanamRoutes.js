import express from 'express';
import { addThirukalayanam, getAllThirukalayanam, updateThirukalayanam, deleteThirukalayanam,getEventByDate } from '../controller/thirukalayanamController.js';
import authenticateAdmin from '../utils/authMiddleware.js';
const router = express.Router();

// Route to add a new entry
router.post('/', addThirukalayanam);

// Route to get all entries
router.get('/', getAllThirukalayanam);

// Route to update an entry by ID
router.put('/:id',  updateThirukalayanam);

// Route to delete an entry by ID
router.delete('/:id', authenticateAdmin, deleteThirukalayanam);

//Router to get the by date
router.get('/getEventByDate', getEventByDate)
export default router;
