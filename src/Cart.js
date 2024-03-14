import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cart({ clearCartCount }) {
  const [cart, setCart] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    pizzaBase: '',
    pizzaCheese: '',
    pizzaSauce: '',
    pizzaVeg: ''
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    clearCartCount(); // Call the function to update cart count in Navbar
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleOptionChange = (optionType, value) => {
    setSelectedOptions({ ...selectedOptions, [optionType]: value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Cart</h2>
          {/* Displaying cart items */}
          {cart.length > 0 ? (
            <>
              <ul className="list-group">
                {cart.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                      {item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
                    </div>
                    <div>
                      <button className="btn btn-sm btn-secondary me-1" onClick={() => removeFromCart(index)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
              <p>Total Price: ${getTotalPrice()}</p>
              <button className="btn btn-danger me-2" onClick={clearCart}>Clear Cart</button>
              <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className="col-md-6">
          {/* Pizza Base Options */}
          <div className="box-container">
            <h3>Pizza Base Options:</h3>
            <div className="form-group">
              <input
                type="radio"
                id="thin"
                name="pizzaBase"
                value="thin"
                checked={selectedOptions.pizzaBase === 'thin'}
                onChange={(e) => handleOptionChange('pizzaBase', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="thin" className="form-check-label">Thin</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="thick"
                name="pizzaBase"
                value="thick"
                checked={selectedOptions.pizzaBase === 'thick'}
                onChange={(e) => handleOptionChange('pizzaBase', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="thick" className="form-check-label">Thick</label>
            </div>
            {/* Add three more pizza base options similarly */}
            <div className="form-group">
              <input
                type="radio"
                id="regular"
                name="pizzaBase"
                value="regular"
                checked={selectedOptions.pizzaBase === 'regular'}
                onChange={(e) => handleOptionChange('pizzaBase', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="regular" className="form-check-label">Regular</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="pan"
                name="pizzaBase"
                value="pan"
                checked={selectedOptions.pizzaBase === 'pan'}
                onChange={(e) => handleOptionChange('pizzaBase', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="pan" className="form-check-label">Pan</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="wholeWheat"
                name="pizzaBase"
                value="wholeWheat"
                checked={selectedOptions.pizzaBase === 'wholeWheat'}
                onChange={(e) => handleOptionChange('pizzaBase', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="wholeWheat" className="form-check-label">Whole Wheat</label>
            </div>
          </div>
          {/* Pizza Cheese Options */}
          <div className="box-container">
            <h3>Pizza Cheese Options:</h3>
            <div className="form-group">
              <input
                type="radio"
                id="mozzarella"
                name="pizzaCheese"
                value="mozzarella"
                checked={selectedOptions.pizzaCheese === 'mozzarella'}
                onChange={(e) => handleOptionChange('pizzaCheese', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="mozzarella" className="form-check-label">Mozzarella</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="cheddar"
                name="pizzaCheese"
                value="cheddar"
                checked={selectedOptions.pizzaCheese === 'cheddar'}
                onChange={(e) => handleOptionChange('pizzaCheese', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="cheddar" className="form-check-label">Cheddar</label>
            </div>
            {/* Add three more cheese options similarly */}
            <div className="form-group">
              <input
                type="radio"
                id="parmesan"
                name="pizzaCheese"
                value="parmesan"
                checked={selectedOptions.pizzaCheese === 'parmesan'}
                onChange={(e) => handleOptionChange('pizzaCheese', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="parmesan" className="form-check-label">Parmesan</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="swiss"
                name="pizzaCheese"
                value="swiss"
                checked={selectedOptions.pizzaCheese === 'swiss'}
                onChange={(e) => handleOptionChange('pizzaCheese', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="swiss" className="form-check-label">Swiss</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="gouda"
                name="pizzaCheese"
                value="gouda"
                checked={selectedOptions.pizzaCheese === 'gouda'}
                onChange={(e) => handleOptionChange('pizzaCheese', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="gouda" className="form-check-label">Gouda</label>
            </div>
          </div>
          {/* Pizza Sauce Options */}
          <div className="box-container">
            <h3>Pizza Sauce Options:</h3>
            <div className="form-group">
              <input
                type="radio"
                id="tomato"
                name="pizzaSauce"
                value="tomato"
                checked={selectedOptions.pizzaSauce === 'tomato'}
                onChange={(e) => handleOptionChange('pizzaSauce', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="tomato" className="form-check-label">Tomato</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="pesto"
                name="pizzaSauce"
                value="pesto"
                checked={selectedOptions.pizzaSauce === 'pesto'}
                onChange={(e) => handleOptionChange('pizzaSauce', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="pesto" className="form-check-label">Pesto</label>
            </div>
            {/* Add three more sauce options similarly */}
            <div className="form-group">
              <input
                type="radio"
                id="bbq"
                name="pizzaSauce"
                value="bbq"
                checked={selectedOptions.pizzaSauce === 'bbq'}
                onChange={(e) => handleOptionChange('pizzaSauce', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="bbq" className="form-check-label">BBQ</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="garlic"
                name="pizzaSauce"
                value="garlic"
                checked={selectedOptions.pizzaSauce === 'garlic'}
                onChange={(e) => handleOptionChange('pizzaSauce', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="garlic" className="form-check-label">Garlic</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="alfredo"
                name="pizzaSauce"
                value="alfredo"
                checked={selectedOptions.pizzaSauce === 'alfredo'}
                onChange={(e) => handleOptionChange('pizzaSauce', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="alfredo" className="form-check-label">Alfredo</label>
            </div>
          </div>
          {/* Pizza Veg Options */}
          <div className="box-container">
            <h3>Pizza Veg Options:</h3>
            <div className="form-group">
              <input
                type="radio"
                id="mushrooms"
                name="pizzaVeg"
                value="mushrooms"
                checked={selectedOptions.pizzaVeg === 'mushrooms'}
                onChange={(e) => handleOptionChange('pizzaVeg', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="mushrooms" className="form-check-label">Mushrooms</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="peppers"
                name="pizzaVeg"
                value="peppers"
                checked={selectedOptions.pizzaVeg === 'peppers'}
                onChange={(e) => handleOptionChange('pizzaVeg', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="peppers" className="form-check-label">Peppers</label>
            </div>
            {/* Add three more veg options similarly */}
            <div className="form-group">
              <input
                type="radio"
                id="olives"
                name="pizzaVeg"
                value="olives"
                checked={selectedOptions.pizzaVeg === 'olives'}
                onChange={(e) => handleOptionChange('pizzaVeg', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="olives" className="form-check-label">Olives</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="onions"
                name="pizzaVeg"
                value="onions"
                checked={selectedOptions.pizzaVeg === 'onions'}
                onChange={(e) => handleOptionChange('pizzaVeg', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="onions" className="form-check-label">Onions</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="spinach"
                name="pizzaVeg"
                value="spinach"
                checked={selectedOptions.pizzaVeg === 'spinach'}
                onChange={(e) => handleOptionChange('pizzaVeg', e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="spinach" className="form-check-label">Spinach</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
