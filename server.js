const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const signupRoute = require('./server/routes/route');
const adminRoute=require('./server/routes/adminroute')
const pizzaRoute=require('./server/routes/pizzaroute')
const orderRoute=require('./server/routes/orderroute')

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (You need to have MongoDB installed and running locally)
mongoose.connect('mongodb://localhost:27017/signupDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connection status
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Use the signup route
app.use(signupRoute);
app.use(adminRoute);
app.use(pizzaRoute);
app.use(orderRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
