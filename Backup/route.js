var nodemailer = require('nodemailer');
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/model');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const router = express.Router();
// Route for user signup
router.post('/signup', async (req, res) => {
  // Check if password and confirmPassword match
  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  try {
    // Check if user already exists with the given email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }
    // Generate JWT token with user data
    const token = jwt.sign({ username, email, password }, 'vivek_coder_123', { expiresIn: '1h' });
    
    // Send verification email
    const verificationLink = `http://localhost:5000/verify-email?token=${token}`;
    sendVerificationEmail(email, verificationLink);
    return res.status(201).json({ message: "Verification email sent. Please verify your email to complete registration." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Function to send verification email
function sendVerificationEmail(email, verificationLink) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vv848356264567@gmail.com',
      pass: 'zpqu zltt wahg gbsq'
    }
  });
  const mailOptions = {
    from: 'vv848356264567@gmail.com',
    to: email,
    subject: 'Verify Your Email',
    text: `Please click the following link to verify your email: ${verificationLink}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Route for verifying email
router.get('/verify-email', async (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }
  try {
    // Decode JWT token
    const decoded = jwt.verify(token, 'vivek_coder_123');
    const { username, email, password } = decoded;
    
    // Save the user to the database
    const newUser = new User({
      username,
      email,
      password,
      verified: true // User is verified after email confirmation
    });
    await newUser.save();
    
    return res.redirect('http://localhost:3000/verified');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and if the password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return user data if sign-in is successful
    return res.status(200).json({ message: "Sign-in successful", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }

    const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vv848356264567@gmail.com',
        pass: 'zpqu zltt wahg gbsq'
      }
    });

    const resetLink = `http://localhost:3000/resetpassword?token=${token}`;

    const mailOptions = {
      from: 'vv848356264567@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `You requested to reset your password. Click this link to reset your password: ${resetLink}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: "Email sent successfully" });
      }
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/updatepassword', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hash the new password

    // Find the user by email and update the password
    await User.findOneAndUpdate({ email }, { password:password });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/order', async (req, res) => {
  try {
    // Extract order data from the request body
    const { orderId, email, name, orderStatus } = req.body;

    // Create a new order instance
    const order = new Order({
      orderId,
      email,
      name,
      orderStatus
    });

    // Save the order to the database
    await order.save();

    // Send a success response with the created order
    res.status(201).json(order);
  } catch (error) {
    // Handle errors
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Error saving order' });
  }
});
router.get('/orders', async (req, res) => {
  const { email } = req.query;
  
  try {
    const orders = await Order.find({ email, orderStatus: "placed" });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = router;