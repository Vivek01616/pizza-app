import React, { useState, useEffect, useRef } from 'react';
import './UserDashboard.css';

function UserDashboard({ incrementCartCount }) {
  const [notification, setNotification] = useState(null);
  const [pizzaVarieties, setPizzaVarieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const pizzaCardsRef = useRef(null);

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
    } finally {
      setLoading(false);
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

  const scrollToPizzaCards = () => {
    if (pizzaCardsRef.current) {
      pizzaCardsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="header text1">
            <h1 className="welcome-text">Welcome to our Pizza Hut!</h1>
            <p>Explore our delicious pizza varieties and add your favorites <br></br>to the cart.</p>
            <div className="button-group">
              <button className="btn btn-primary mr-3" onClick={() => scrollToPizzaCards()}>Order Now</button>
              <button className="btn btn-outline-primary" onClick={() => scrollToPizzaCards()}>Explore</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img src="https://static.vecteezy.com/system/resources/previews/025/446/386/non_2x/tasty-top-view-pizza-italian-traditional-round-pizza-white-background-ai-generative-free-photo.jpg" alt="Pizza Banner" className="banner-image" />
        </div>
      </div>
      <div className="row" ref={pizzaCardsRef}>
        <div className="col-md-12">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="pizza-list row">
              {pizzaVarieties.map(pizza => (
                <div key={pizza.id} className="col-md-3 mb-3">
                  <div className="card">
                    <img src={pizza.image} className="card-img-top" alt={pizza.name} />
                    <div className="card-body">
                      <h5 className="card-title">{pizza.name}</h5>
                      <p className="card-text">${pizza.price}</p>
                      <button className="btn btn-primary" onClick={() => addToCart(pizza)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {notification && (
        <div className="notification">
          <div className="alert alert-success" role="alert">
            {notification}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
