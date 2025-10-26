import Inventory from '../models/inventory.js';
import Transaction from '../models/transaction.js';

// ===============================
// ADD INVENTORY
// ===============================
export const addInventory = async (req, res) => {
  try {
    const { categoryId, subCategoryId, itemId,name, quantity, unit, isExpire, expireDate,isbarrowed } = req.body;

    const inventory = new Inventory({
      categoryId,
      subCategoryId,
      itemId,
      quantity,
      unit,
      isExpire,
      expireDate: isExpire ? expireDate : null,
      name,
      isbarrowed
    });

    await inventory.save();
    res.status(201).json({ message: 'Inventory added successfully', inventory });
  } catch (error) {
    res.status(500).json({ message: 'Error adding inventory', error });
  }
};

// ===============================
// GET ALL INVENTORIES
// ===============================
export const getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find()
      .populate('categoryId', 'name')
      .populate('subCategoryId', 'name')
      .populate('itemId', 'name');
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventories', error });
  }
};

// ===============================
// GET INVENTORY BY ID
// ===============================
export const getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findById(id)
      .populate('categoryId', 'name')
      .populate('subCategoryId', 'name')
      .populate('itemId', 'name');

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory by ID', error });
  }
};

// ===============================
// UPDATE INVENTORY
// ===============================
export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, subCategoryId, itemId, quantity, unit, isExpire, expireDate } = req.body;

    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      {
        categoryId,
        subCategoryId,
        itemId,
        quantity,
        unit,
        isExpire,
        expireDate: isExpire ? expireDate : null,
      },
      { new: true }
    );

    if (!updatedInventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.status(200).json({ message: 'Inventory updated successfully', inventory: updatedInventory });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error });
  }
};

// ===============================
// DELETE INVENTORY
// ===============================
export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInventory = await Inventory.findByIdAndDelete(id);

    if (!deletedInventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.status(200).json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inventory', error });
  }
};

// ===============================
// ISSUE ITEM
// ===============================
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
      itemName: inventory.itemId.toString(),
      inventoryId,
      quantity,
      userId,
      isReturnable: true,
      action: 'issue',
    });

    await transaction.save();
    res.status(200).json({ message: 'Item issued successfully', inventory, transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error issuing item', error });
  }
};

// ===============================
// RETURN ITEM (Optional Feature)
// ===============================
export const returnItem = async (req, res) => {
  try {
    const { inventoryId, quantity, userId } = req.body;

    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    inventory.quantity += quantity;
    await inventory.save();

    const transaction = new Transaction({
      itemName: inventory.itemId.toString(),
      inventoryId,
      quantity,
      userId,
      isReturnable: true,
      action: 'return',
    });

    await transaction.save();
    res.status(200).json({ message: 'Item returned successfully', inventory, transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error returning item', error });
  }
};

// Get all inventory entries for a specific item
export const getInventoryByItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const inventoryList = await Inventory.find({ itemId });

    res.status(200).json(inventoryList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory by item", error });
  }
};
