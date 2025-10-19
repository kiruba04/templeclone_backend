import express from 'express';
import {
  addCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
} from '../controller/categoryController.js';

const router = express.Router();

// Add a new category
router.post('/', addCategory);

// Update a category by ID
router.put('/:id', updateCategory);

// Get all categories
router.get('/', getAllCategories);

// Get a category by ID
router.get('/:id', getCategoryById);

// Delete a category by ID
router.delete('/:id', deleteCategory);

export default router;
