// model.js

const mongoose = require('mongoose');

// Define MongoDB schema for user data
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
