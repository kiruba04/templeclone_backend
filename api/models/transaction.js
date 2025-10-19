import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true, // Removes unnecessary whitespaces
  },
  inventoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory', // Reference to the Inventory model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Ensure at least one item is transacted
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (if applicable)
    required: true,
  },
  isReturnable: {
    type: Boolean,
    required: true,
    default: false, // Default is not returnable
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
