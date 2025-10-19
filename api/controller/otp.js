
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID 
const authToken = process.env.TWILIO_AUTH_TOKEN 
const client = twilio(accountSid, authToken);

// Example storage for OTPs (in production, use a database or caching mechanism)
const otpStore = new Map();

export const sendOTP = async (req, res) => {
  const { phone } = req.body;
  
  // Validate phone number format (assuming it starts with +91 for India)
  if (!phone.startsWith('+91')) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }
  
  // Generate OTP
  const otp = generateOTP();
  
  // Store OTP with phone number
  otpStore.set(phone, otp);
  
  try {
    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP for registration is: ${otp}`,
      to: phone, // Phone number format: '+91xxxxxxxxxx'
      from: '+916379067731', // Your Twilio phone number
    });
    
    console.log(`OTP sent to ${phone}: ${otp}`);
    
    // Return success response
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

export const verifyOTP = (req, res) => {
  const { phone, otp } = req.body;
  
  // Validate phone number format (assuming it starts with +91 for India)
  if (!phone.startsWith('+91')) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }
  
  // Retrieve OTP from storage
  const storedOTP = otpStore.get(phone);
  
  if (!storedOTP || storedOTP !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
  
  // Clear OTP from storage after successful verification (optional)
  otpStore.delete(phone);
  
  // Return success response
  res.status(200).json({ message: 'OTP verified successfully' });
};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
}
