import express from 'express';
import {
  addInventory,
  issueItem} from '../controller/managementController.js';

const router = express.Router();

// Route to add inventory
router.post('/inventory', addInventory);

// Route to issue an item
router.post('/inventory/issue', issueItem)

export default router;
