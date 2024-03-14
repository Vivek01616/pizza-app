import React, { useState, useEffect } from 'react';

function UserDashboard({ incrementCartCount }) {
  const [notification, setNotification] = useState(null);
  const [pizzaVarieties, setPizzaVarieties] = useState([]);

  useEffect(() => {
    fetchPizzaVarieties();
  }, []);

  const fetchPizzaVarieties = async () => {
    try {
      const response = await fetch('http://localhost:5000/pizzasget');
      if (response.ok) {
        const data = await response.json();
        setPizzaVarieties(data);
      } else {
        throw new Error('Failed to fetch pizza varieties');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        {pizzaVarieties.map(pizza => (
          <div key={pizza.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={pizza.image} className="card-img-top" alt={pizza.name} />
              <div className="card-body" style={{width: '10rem', height: '10rem' }}>
                <h5 className="card-title">{pizza.name}</h5>
                <p className="card-text">${pizza.price}</p>
                <button className="btn btn-primary" onClick={() => addToCart(pizza)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
