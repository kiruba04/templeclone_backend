import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    required: true,
  },
  subCategoryName: {
    type: String,
    required: true,
    trim: true, // Removes unnecessary whitespaces
    unique: true, // Ensures no duplicate sub-category names
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;
