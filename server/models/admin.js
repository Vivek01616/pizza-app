

const mongoose = require('mongoose');

// Define MongoDB schema for user data
const AdminSchema = new mongoose.Schema({
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
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
