import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orders({ userEmail }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null); // State to store selected order status

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:5000/orders?email=${userEmail}`);
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  const handleTrackOrder = (status) => {
    setSelectedOrderStatus(status);
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  // Define a function to get the width percentage of each status segment
  const getStatusWidth = (status) => {
    switch (status) {
      case 'placed':
        return '25%'; // Represents 'placed'
      case 'preparing':
        return '50%'; // Represents 'preparing'
      case 'out for delivery':
        return '75%'; // Represents 'out for delivery'
      case 'delivered':
        return '100%'; // Represents 'delivered'
      default:
        return '0%';
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Orders</h1>
      {orders.length === 0 ? (
        <div>You have no orders.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Delivery adress</th>
                <th>Track Order</th> {/* Add a new column for the Track Order button */}
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>{item.name} - Quantity: {item.quantity}, Price: {item.price}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                     {order.address}
                  </td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleTrackOrder(order.orderStatus)}>Track Order</button> {/* Track Order button with Bootstrap styling */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedOrderStatus && (
        <div className="progress">
          <div className="progress-bar bg-info" style={{ width: getStatusWidth(selectedOrderStatus) }}>
            {selectedOrderStatus === 'placed' && 'Placed'}
            {selectedOrderStatus === 'preparing' && 'Preparing'}
            {selectedOrderStatus === 'out for delivery' && 'Out for Delivery'}
            {selectedOrderStatus === 'delivered' && 'Delivered'}
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
