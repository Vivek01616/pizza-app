const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    required: true
  },
  items: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  address: {
    type: String,
    required: true
  }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
