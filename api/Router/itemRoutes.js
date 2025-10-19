import express from 'express';
import {
  createItem,
  updateItem,
  getAllBySubCategoryId,
  getItemById,
  deleteItem,
} from '../controller/itemController.js';

const router = express.Router();

// Create an item
router.post('/', createItem);

// Update an item by ID
router.put('/:id', updateItem);

// Get all items by subcategory ID
router.get('/subcategory/:subCategoryId', getAllBySubCategoryId);

// Get an item by ID
router.get('/:id', getItemById);

// Delete an item by ID
router.delete('/:id', deleteItem);

export default router;
