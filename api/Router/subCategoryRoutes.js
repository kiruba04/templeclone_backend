import express from 'express';
import {
  createSubCategory,
  updateSubCategory,
  getAllByCategoryId,
  getSubCategoryById,
  deleteSubCategory,
} from '../controller/subCategoryController.js';

const router = express.Router();

// Create a sub-category
router.post('/', createSubCategory);

// Update a sub-category by ID
router.put('/:id', updateSubCategory);

// Get all sub-categories by category ID
router.get('/category/:categoryId', getAllByCategoryId);

// Get a sub-category by ID
router.get('/:id', getSubCategoryById);

// Delete a sub-category by ID
router.delete('/:id', deleteSubCategory);

export default router;
