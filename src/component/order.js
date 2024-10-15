import React, { useState } from 'react';
import axios from 'axios';
import "../css/order.css";

const OrderForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [foodItem, setFoodItem] = useState('');
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const price = 10; // Set a fixed price or calculate based on the food item

        const orderData = { 
            customerName, 
            address,
            items: [{ itemName: foodItem, quantity, price }], 
            totalAmount: quantity * price 
        };

        try {
            const response = await axios.post('http://localhost:5004/api/orders', orderData);
            setSuccess('Order placed successfully!');
            setCustomerName('');
            setFoodItem('');
            setAddress('');
            setQuantity(1);
            setError(null); // Clear any previous error
            window.alert("Order successfully placed!"); // Alert message on success
        } catch (err) {
            console.error('Error placing order:', err.response ? err.response.data : err.message);
            setError('Could not place order.');
            setSuccess(null); // Clear any previous success message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Place Order</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <label>
                Customer Name:
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
            </label>
            <label>
                Food Item:
                <input
                    type="text"
                    value={foodItem}
                    onChange={(e) => setFoodItem(e.target.value)}
                    required
                />
            </label>
            <label>
                Address:
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                Email
                <input
                    
                />
            </label>
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderForm;
                                                                                  