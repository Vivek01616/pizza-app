import React from 'react';

function PizzaVarietiesList({ addToCart }) {
  const pizzaVarieties = [
    { id: 1, name: 'Margherita', price: 10 },
    { id: 2, name: 'Pepperoni', price: 12 },
    { id: 3, name: 'Vegetarian', price: 11 },
    { id: 4, name: 'Hawaiian', price: 13 },
    { id: 5, name: 'Meat Lovers', price: 14 },
    // Add more pizza varieties as needed
  ];

  return (
    <div className="container">
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
  );
}

export default PizzaVarietiesList;
