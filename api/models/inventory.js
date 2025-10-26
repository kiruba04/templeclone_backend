import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    required: true,
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory', // Reference to the SubCategory model
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item', // Reference to the Item model
    required: true,
  },
  name:{
    type: String,
    required: true,

  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Ensure quantity cannot be negative
  },
  unit: {
    type: String,
    required: true,
    trim: true, // Remove unnecessary whitespaces
  },
  isExpire: {
    type: Boolean,
    required: true,
    default: true, // By default, items are assumed to have an expiration date
  },
  expireDate: {
    type: Date,
    required: function () {
      return this.isExpire; // expireDate is required only if isExpire is true
    },
  },
  isbarrowed: {
    type: Boolean,
    required: true,
    default: false, // By default, items are assumed not to be borrowed
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
