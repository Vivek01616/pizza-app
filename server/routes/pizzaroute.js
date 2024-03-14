// Import necessary modules
const express = require('express');
const prouter = express.Router();
const Pizza = require('../models/pizza'); // Assuming your Pizza model file is in the models directory

// Route to create a new pizza
prouter.post('/pizzas', async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const pizza = new Pizza({ name, price, image });
    await pizza.save();
    res.status(201).json(pizza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get all pizzas
prouter.get('/pizzasget', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a specific pizza by ID
prouter.get('/pizzas/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' });
    }
    res.json(pizza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to update a pizza by ID
prouter.put('/pizzas/:id', async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, { name, price, image }, { new: true });
    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' });
    }
    res.json(pizza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to delete a pizza by ID
prouter.delete('/pizzas/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' });
    }
    res.json({ message: 'Pizza deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = prouter;