import React, { useState, useEffect } from 'react';

function UserDashboard({ incrementCartCount }) {
  const [notification, setNotification] = useState(null);
  const pizzaVarieties = [
    { id: 1, name: 'Margherita', price: 10 },
    { id: 2, name: 'Pepperoni', price: 12 },
    { id: 3, name: 'Vegetarian', price: 11 },
    { id: 4, name: 'Hawaiian', price: 13 },
    { id: 5, name: 'Meat Lovers', price: 14 },
    // Add more pizza varieties as needed
  ];

  const addToCart = (pizza) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === pizza.id);

    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...pizza, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    incrementCartCount();
    setNotification('Item added to cart');
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="container">
      {notification && (
        <div className="alert alert-success" role="alert">
          {notification}
        </div>
      )}
      <div className="row">
        <div className="col-md-6">
          <h2>Available Pizza Varieties</h2>
          <ul className="list-group">
            {pizzaVarieties.map(pizza => (
              <li key={pizza.id} className="list-group-item d-flex justify-content-between align-items-center">
                {pizza.name}
                <span className="badge bg-primary rounded-pill">${pizza.price}</span>
                <button className="btn btn-primary" onClick={() => addToCart(pizza)}>Add to Cart</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h2>Saved For Later</h2>
          {/* Display saved items for later */}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;