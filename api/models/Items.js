import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory', // Reference to the SubCategory model
    required: true,
  },
  itemName: {
    type: String,
    required: true,
    trim: true, // Removes unnecessary whitespaces
    unique: true, // Ensures no duplicate item names
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Item = mongoose.model('Item', itemSchema);

export default Item;
