import Item from '../models/Items.js';

// Create a new item
export const createItem = async (req, res) => {
  try {
    const { subCategoryId, itemName } = req.body;

    // Check if all required fields are provided
    if (!subCategoryId || !itemName) {
      return res.status(400).json({ message: 'SubCategory ID and Item Name are required.' });
    }

    // Create a new instance of the Item model
    const item = new Item({ subCategoryId, itemName });

    // Save the item to the database
    await item.save();

    res.status(201).json({
      message: 'Item created successfully',
      item,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error: error.message });
  }
};

// Update an item by ID
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { itemName },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({
      message: 'Item updated successfully',
      updatedItem,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
};

// Get all items by subcategory ID
export const getAllBySubCategoryId = async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    const items = await Item.find({ subCategoryId });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
};

// Get an item by ID
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id).populate('subCategoryId', 'subCategoryName');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
};

// Delete an item by ID
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};
