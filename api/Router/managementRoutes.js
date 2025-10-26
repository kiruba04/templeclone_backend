import express from 'express';
import {
  addInventory,
  getAllInventories,
  getInventoryById,
  updateInventory,
  deleteInventory,
  issueItem,
  returnItem,
  getInventoryByItem
} from '../controller/managementController.js';

const router = express.Router();

// ➕ Add a new inventory item
router.post('/', addInventory);

// 📦 Get all inventory items
router.get('/', getAllInventories);

// 🔍 Get a specific inventory item by ID
router.get('/:id', getInventoryById);

// ✏️ Update an inventory item by ID
router.put('/:id', updateInventory);

// ❌ Delete an inventory item by ID
router.delete('/:id', deleteInventory);

// 📤 Issue an item
router.post('/issue', issueItem);

// 📥 Return an item (optional feature)
router.post('/return', returnItem);

// 📦 Get all inventory entries for a specific item
router.get('/item/:itemId', getInventoryByItem);

export default router;
