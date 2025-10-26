import express from 'express';
import Twilio from 'twilio';
import Volunteer from '../models/volunteer.js';
import User from '../models/user.js';
import Specialdevotee from '../models/specialdevotess.js';
import Uthchavam from '../models/Uthchavam.js'; // Import your Uthchavam model
import dotenv  from "dotenv"

dotenv.config();

const router = express.Router();
// Twilio credentials
const twilioClient = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN); 

const twilioNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number

// Route to send images
router.post('/send-images', async (req, res) => {
  const { uthchavamId, groupType } = req.body;

  // Validate uthchavamId
  if (!uthchavamId || !uthchavamId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid or missing Uthchavam ID' });
  }

  try {
    // Fetch the uthchavam details
    const uthchavam = await Uthchavam.findById(uthchavamId);

    if (!uthchavam) {
      return res.status(404).json({ error: 'Uthchavam not found' });
    }

    const { imageurls } = uthchavam;

    let users;

    switch (groupType) {
      case 'devotee':
        users = await User.find({});
        break;
      case 'volunteer':
        users = await Volunteer.find({});
        break;
      case 'special':
        users = await Specialdevotee.find({});
        break;
      default:
        return res.status(400).json({ error: 'Invalid group type' });
    }

    // Filter out users without phone numbers
    const usersWithPhone = users.filter(user => user.phone);

    // Prepare message sending promises
    const sendMessagesPromises = usersWithPhone.map(user => {
      const messageBody = `Here is the invitation for Uthchavam. Click the below link to view the invitation: ${imageurls.join(', ')}`;
      return twilioClient.messages.create({
        body: messageBody,
        from: twilioNumber,
        to: `+91${user.phone}`
      }).catch(err => {
        console.error(`Failed to send message to ${user.phone}:`, err);
      });
    });

    // Wait for all messages to be sent
    await Promise.all(sendMessagesPromises);
    res.status(200).json({ message: 'Messages sent successfully' });
  } catch (error) {
    console.error('Error sending messages:', error);
    res.status(500).json({ error: 'Failed to send messages' });
  }
});

export default router;
