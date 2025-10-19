import mongoose from 'mongoose';

// Define the schema
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true, // Removes unnecessary whitespaces
    unique: true, // Ensures no duplicate category names
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the model
const Category = mongoose.model('Category', categorySchema);

export default Category; // Export using ES Modules
