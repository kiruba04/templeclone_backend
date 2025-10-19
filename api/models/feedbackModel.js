import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  fullname: {
    type: String
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: String, // storing as formatted date string
  },
  issueDate: {
    type: Date, // Better to store as Date instead of String
  },
  issuePlace: {
    type: String
  }
});

export default mongoose.model('Feedback', feedbackSchema);
