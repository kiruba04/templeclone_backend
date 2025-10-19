import Response from '../models/responseModel.js';
import Feedback from '../models/feedbackModel.js';
import Trustee from '../models/Trustee.js';
import nodemailer from 'nodemailer';

// POST: Store response and send email
export const sendResponse = async (req, res) => {
  try {
    const { feedbackId, trusteeId, response } = req.body;

    // 1. Validate input
    if (!feedbackId || !trusteeId || !response) {
      return res.status(400).json({ message: 'feedbackId, trusteeId, and response are required' });
    }

    // 2. Get Feedback and Trustee details
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    const trustee = await Trustee.findById(trusteeId);
    if (!trustee) {
      return res.status(404).json({ message: 'Trustee not found' });
    }

    // 3. Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or other service (e.g., SMTP)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 4. Send email to feedback's email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: feedback.email,
      subject: 'Response to Your Feedback',
      text: `Hello ${feedback.fullname || 'User'},\n\n${response}\n\nRegards,\n${trustee.username || 'Trustee Team'}`
    });

    // 5. Store response in database
    const newResponse = new Response({
      feedbackId,
      trusteeId,
      response
    });

    await newResponse.save();

    res.status(201).json({ message: 'Response sent and saved successfully', response: newResponse });
  } catch (error) {
    console.error('Error sending response:', error);
    res.status(500).json({ message: 'Failed to send response' });
  }
};

// GET: Fetch all responses
export const getAllResponses = async (req, res) => {
  try {
    // Fetch all responses and populate feedback & trustee info
    const responses = await Response.find()
      .populate('feedbackId', 'fullname email') // Only fetch specific fields from Feedback
      .populate('trusteeId', 'username email')  // Only fetch specific fields from Trustee
      .sort({ createdAt: -1 }); // Latest first (optional)

    res.status(200).json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ message: 'Failed to fetch responses' });
  }
};
