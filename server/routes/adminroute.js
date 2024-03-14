const express = require('express');
const Admin = require('../models/admin');
const aroute = express.Router();
aroute.post('/admin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const admin = await Admin.findOne({ email });
  
      // Check if user exists and if the password matches
      if (!admin || admin.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Return user data if sign-in is successful
      return res.status(200).json({ message: "Sign-in successful", admin });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  aroute.post('/admins', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const admin = new Admin({
        email,
        password  // User is verified after email confirmation
      });
      await admin.save();
      // Return user data if sign-in is successful
      return res.status(200).json({ message: "admin created succesfully", admin });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  module.exports = aroute;