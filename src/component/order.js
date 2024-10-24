import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@mui/material'; // Material UI components
import "../css/order.css";

const OrderForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [foodItem, setFoodItem] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const price = 10; // Set a fixed price or calculate based on the food item

        const orderData = { 
            customerName, 
            address,
            items: [{ itemName: foodItem, price }], // No quantity here, just the item
            totalAmount: price 
        };

        try {
            const response = await axios.post('http://localhost:5004/api/orders', orderData);
            setSuccess('Order placed successfully!');
            setCustomerName('');
            setFoodItem('');
            setAddress('');
            setError(null); // Clear any previous error
            window.alert("Order successfully placed!"); // Alert message on success

            // Redirect to payment page after order is placed
            navigate('/payment');
        } catch (err) {
            console.error('Error placing order:', err.response ? err.response.data : err.message);
            setError('Could not place order.');
            setSuccess(null); // Clear any previous success message
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
            <Typography variant="h4" gutterBottom>
                Place Order
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="success">{success}</Typography>}
            
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Customer Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
                
                
                
                <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    style={{ marginTop: '20px' }}
                >
                    Submit Order
                </Button>
            </form>
        </Paper>
    );
};

export default OrderForm;
