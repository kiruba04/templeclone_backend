import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  feedbackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback',
    required: true
  },
  trusteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trustee',
    required: true
  },
  response: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Response', responseSchema);
