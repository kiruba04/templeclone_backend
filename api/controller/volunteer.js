import User from '../models/volunteer.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // This retrieves all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUserByPhone = async (req, res) => {
  try {
    const { phone } = req.query;
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const { phone, name } = req.query;

    let user;
    if (phone) {
      user = await User.findOne({ phone });
    } else if (name) {
      user = await User.findOne({ username: name });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
    const { 
      username,
      lastname, 
      password, 
      isAdmin,
      dateOfBirth,
      email,
      phone,
      address,
    } = req.body;
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new User instance
      const newUser = new User({
        username,
        lastname,
        password: hashedPassword,
        isAdmin: isAdmin || false,
        dateOfBirth,
        email,
        phone,
        address,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.jwt, { expiresIn: '1h' });
  
      // Set the access_token cookie and send response
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: true, // Ensure this is set if using HTTPS
        sameSite: 'None',
        maxAge: 24 * 60 * 60 // 24 hours in seconds
      }).status(200).json({ auth: true, token }); // Sending auth and token in response
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(401).send('Error registering user.'); // Send a generic error message
    }
  };