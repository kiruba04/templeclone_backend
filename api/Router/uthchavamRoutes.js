import express from 'express';
import { 
    createUthchavam, 
    getAllUthchavams, 
    getUthchavamById, 
    updateUthchavamById,
    deleteUthchavamById
} from '../controller/uthchavamController.js'; // Adjust the path as per your directory structure

const router = express.Router();

// Route to create a new Uthchavam
router.post('/', createUthchavam);

// Route to get all Uthchavams
router.get('/', getAllUthchavams);

// Route to get a single Uthchavam by ID
router.get('/:id', getUthchavamById);

// Route to update a Uthchavam by ID
router.put('/:id', updateUthchavamById);

// Route to delete a Uthchavam by ID
router.delete('/:id', deleteUthchavamById);

export default router;
