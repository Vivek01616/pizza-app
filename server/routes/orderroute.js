const express = require('express');
const Order = require('../models/order');
const orderr=express.Router();
orderr.post('/order', async (req, res) => {
    try {
      // Extract order data from the request body
      const { orderId, email, name, orderStatus, items, address } = req.body;
  
      // Create a new order instance
      const order = new Order({
        orderId,
        email,
        name,
        orderStatus,
        items, // Assuming items is an array of objects with name, quantity, and price fields
        address, // Assuming address is an object with street, city, state, and zip fields
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
  
orderr.get('/orders', async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to fetch orders');
    }
  });
  
  // Update order status
  orderr.put('/orders/:id/status', async (req, res) => {
    const id  = req.params.id; // Accessing the ID correctly
    const status  = req.body.status; // Correctly accessing the status from req.body
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: id }, // Use _id instead of orderId
            { $set: { orderStatus: status } },
            { new: true }
        );
        res.json(updatedOrder);
        console.log(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to update order status');
    }
});

module.exports=orderr;
  
  