import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    city: '',
    pinCode: ''
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    script.onload = () => {
      console.log('Razorpay script loaded successfully');
    };

    script.onerror = () => {
      console.error('Failed to load Razorpay script');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleProceedToPayment = async () => {
    const totalAmount = getTotalAmount();
    const options = {
      key: 'rzp_test_7OYdETxz1Km5Si',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'Pizza App',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.contact
      },
      notes: {
        address: formData.address,
        city: formData.city,
        pincode: formData.pinCode // Fixed: changed to pincode
      },
      theme: {
        color: '#3399cc'
      },
      handler: async function(response) {
        console.log('Payment successful:', response);
        await sendOrderData(response);
        navigateToOrder();
      }
    };

    if (window && window.Razorpay) {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      console.error('Razorpay script not loaded');
    }
  };

  const sendOrderData = async (response) => {
    try {
      console.log('Response object:', response);
      const orderData = {
        orderId: response.razorpay_payment_id,
        email: formData.email,
        name: formData.name,
        orderStatus: 'placed',
        items: cart, // Assuming cart contains the items with name, price, and quantity fields
        address: formData.address,
        city: formData.city,
        pincode: formData.pinCode // Fixed: changed to pincode
      };
      const serverResponse = await axios.post("http://localhost:5000/order", orderData);
      console.log('Order data sent to server:', serverResponse.data);
    } catch (error) {
      console.error('Error sending order data:', error);
    }
  };

  const navigateToOrder = () => {
    window.location.href = '/order';
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>Items in Cart</h3>
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Enter Your Address Details</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact</label>
              <input type="text" className="form-control" id="contact" name="contact" value={formData.contact} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="pinCode" className="form-label">Pin Code</label>
              <input type="text" className="form-control" id="pinCode" name="pinCode" value={formData.pinCode} onChange={handleInputChange} />
            </div>
            <p>Total Amount: ${getTotalAmount()}</p>
            <button type="button" className="btn btn-primary" onClick={handleProceedToPayment}>Proceed to Payment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
