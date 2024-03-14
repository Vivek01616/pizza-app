import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [selectedOption, setSelectedOption] = useState('Pizza Management');
  const [pizzaName, setPizzaName] = useState('');
  const [pizzaPrice, setPizzaPrice] = useState('');
  const [pizzaImage, setPizzaImage] = useState('');
  const [notification, setNotification] = useState('');
  const [pizzas, setPizzas] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await fetch('http://localhost:5000/pizzasget');
      if (response.ok) {
        const data = await response.json();
        setPizzas(data);
      } else {
        throw new Error('Failed to fetch pizzas');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPizza = async () => {
    try {
      const response = await fetch('http://localhost:5000/pizzas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: pizzaName,
          price: parseFloat(pizzaPrice),
          image: pizzaImage
        })
      });
      if (response.ok) {
        setNotification('Pizza added successfully');
        fetchPizzas(); // Refresh the pizza list
        // Clear input fields after adding pizza
        setPizzaName('');
        setPizzaPrice('');
        setPizzaImage('');
      } else {
        throw new Error('Failed to add pizza');
      }
    } catch (error) {
      console.error(error);
      setNotification('Failed to add pizza');
    }
  };

  const handleDeletePizza = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/pizzas/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setNotification('Pizza deleted successfully');
        fetchPizzas(); // Refresh the pizza list
      } else {
        throw new Error('Failed to delete pizza');
      }
    } catch (error) {
      console.error(error);
      setNotification('Failed to delete pizza');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        setNotification('Order status updated successfully');
        fetchOrders(); // Refresh the order list
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      console.error(error);
      setNotification('Failed to update order status');
    }
  };

  return (
    <div className="container-fluid">
      <h2>Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-3 sidebar">
          <ul className="nav flex-column">
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${selectedOption === 'Pizza Management' && 'active'}`} onClick={() => setSelectedOption('Pizza Management')}>Pizza Management</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${selectedOption === 'Order Management' && 'active'}`} onClick={() => setSelectedOption('Order Management')}>Order Management</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${selectedOption === 'Notification' && 'active'}`} onClick={() => setSelectedOption('Notification')}>Notification</button>
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          {selectedOption === 'Pizza Management' && (
            <div>
              <h3>Pizza Management</h3>
              <div className="panel black-panel">
                <div className="panel-body">
                  <h3 className="panel-title">Add Pizza</h3>
                  <input type="text" className="form-control" placeholder="Pizza Name" value={pizzaName} onChange={e => setPizzaName(e.target.value)} />
                  <input type="number" className="form-control mt-2" placeholder="Price" value={pizzaPrice} onChange={e => setPizzaPrice(e.target.value)} />
                  <input type="text" className="form-control mt-2" placeholder="Image URL" value={pizzaImage} onChange={e => setPizzaImage(e.target.value)} />
                  <button className="btn btn-primary btn-block mt-2" onClick={handleAddPizza}>Add Pizza</button>
                  {notification && <p className="mt-2 text-success">{notification}</p>}
                </div>
              </div>
              <h3>All Pizzas</h3>
              <ul className="list-group">
                {pizzas.map(pizza => (
                  <li key={pizza._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <img src={pizza.image} alt={pizza.name} style={{ width: '100px', marginRight: '10px' }} />
                      {pizza.name}
                    </div>
                    <span className="badge bg-primary rounded-pill">${pizza.price}</span>
                    <button className="btn btn-danger" onClick={() => handleDeletePizza(pizza._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedOption === 'Order Management' && (
            <div>
              <h3>Order Management</h3>
              <ul className="list-group">
                {orders.map(order => (
                  <li key={order._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      Order ID: {order._id}<br />
                      Status:
                      <select value={order.status} onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}>
                        <option value="placed">Placed</option>
                        <option value="preparing">Preparing</option>
                        <option value="out for delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Notification content */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
