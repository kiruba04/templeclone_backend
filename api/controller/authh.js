import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Trustee from '../models/Trustee.js';

// Function to register a new user
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

export const login = async (req, res) => {
  const { phone, password } = req.body;
  let user;
  let userType = '';

  // Try finding in Users collection
  user = await User.findOne({ phone });
  if (user) {
    userType = user.isAdmin ? 'admin' : 'normal user';
  } else {
    // If not found, check in Trustee collection
    user = await Trustee.findOne({ phone });
    if (user) {
      userType = 'trustee';
    }
  }

  if (!user) return res.status(404).send('User not found.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Invalid password.');

  const token = jwt.sign({ id: user._id, userType }, process.env.jwt, {
    expiresIn: '1h',
  });

  res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .status(200)
    .json({ auth: true, token, userType, user });
};


// Function to handle logout
export const logout = async (req, res) => {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true, // Ensure this is set if using HTTPS
      sameSite: 'None',
      domain: 'localhost', // Make sure the domain matches your front-end domain
      path: '/',
    });
    res.status(200).send({ auth: false, token: null });
  };
  
// Function to check authentication status
export const checkAuth = async (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.jwt, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    let user = null;

    if (decoded.userType === 'trustee') {
      user = await Trustee.findById(decoded.id);
    } else {
      user = await User.findById(decoded.id);
    }

    if (!user) {
      return res.status(404).send({ auth: false, message: 'User not found.' });
    }

    res.status(200).send({
      isLoggedIn: true,
      auth: true,
      userType: decoded.userType,
      user,
    });
  });
};

