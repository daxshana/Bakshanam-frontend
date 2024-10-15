import React, { useEffect, useState } from 'react';
import axios from 'axios';
import"../css/Ordermanagement.css";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5004/api/orders');
                setOrders(response.data);
            } catch (err) {
                console.error('Error fetching orders:', err.response ? err.response.data : err.message);
                setError('Could not fetch orders.');
            }
        };
        fetchOrders();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5004/api/orders/${id}`);
            setOrders(orders.filter(order => order._id !== id));
        } catch (err) {
            console.error('Error deleting order:', err.response ? err.response.data : err.message);
            setError('Could not delete order.');
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Items</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.customerName}</td>
                            <td>
                                {order.items.map((item, index) => (
                                    <div key={index}>{item.itemName} (x{item.quantity})</div>
                                ))}
                            </td>
                            <td>{order.totalAmount}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => handleDelete(order._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
