import Inventory from '../models/inventory.js';
import Transaction from '../models/transaction.js';

export const addInventory = async (req, res) => {
  try {
    const { categoryId, subCategoryId, itemId, quantity, unit, isExpire, expireDate } = req.body;

    const inventory = new Inventory({
      categoryId,
      subCategoryId,
      itemId,
      quantity,
      unit,
      isExpire,
      expireDate: isExpire ? expireDate : null,
    });

    await inventory.save();
    res.status(201).json({ message: 'Inventory added successfully', inventory });
  } catch (error) {
    res.status(500).json({ message: 'Error adding inventory', error });
  }
};

export const issueItem = async (req, res) => {
    try {
      const { inventoryId, quantity, userId } = req.body;
  
      const inventory = await Inventory.findById(inventoryId);
      if (!inventory || inventory.quantity < quantity) {
        return res.status(400).json({ message: 'Insufficient quantity in inventory or inventory not found' });
      }
  
      inventory.quantity -= quantity;
      await inventory.save();
  
      const transaction = new Transaction({
        itemName: inventory.itemId.toString(), // Ideally, populate item details
        inventoryId,
        quantity,
        userId,
        isReturnable: true, // Assuming default is true; adjust as needed
      });
  
      await transaction.save();
      res.status(200).json({ message: 'Item issued successfully', inventory, transaction });
    } catch (error) {
      res.status(500).json({ message: 'Error issuing item', error });
    }
  };