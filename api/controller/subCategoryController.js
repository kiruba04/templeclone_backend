import SubCategory from '../models/SubCategory.js';

// Create a new sub-category
export const createSubCategory = async (req, res) => {
    try {
      const { categoryId, subCategoryName } = req.body;
  
      // Check if all required fields are provided
      if (!categoryId || !subCategoryName) {
        return res.status(400).json({ message: 'Category ID and SubCategory Name are required.' });
      }
  
      // Create a new instance of the SubCategory model
      const subCategory = new SubCategory({ categoryId, subCategoryName });
  
      // Save the sub-category to the database
      await subCategory.save();
  
      res.status(201).json({
        message: 'Sub-category created successfully',
        subCategory,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating sub-category', error: error.message });
    }
  };
  

// Update a sub-category by ID
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { subCategoryName } = req.body;

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      { subCategoryName },
      { new: true, runValidators: true }
    );

    if (!updatedSubCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }

    res.status(200).json({
      message: 'Sub-category updated successfully',
      updatedSubCategory,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating sub-category', error: error.message });
  }
};

// Get all sub-categories by category ID
export const getAllByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const subCategories = await SubCategory.find({ categoryId });
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sub-categories', error: error.message });
  }
};

// Get a sub-category by ID
export const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findById(id).populate('categoryId', 'categoryName');
    if (!subCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sub-category', error: error.message });
  }
};

// Delete a sub-category by ID
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);
    if (!deletedSubCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }

    res.status(200).json({ message: 'Sub-category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sub-category', error: error.message });
  }
};
