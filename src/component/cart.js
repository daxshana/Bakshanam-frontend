import React from 'react';
import { useCart } from '../component/CartContexrprovider';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../css/cart.css';

const CartPage = () => {
  const { cart, updateCartItemQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/order', { state: { cart, totalPrice: getTotalCartAmount() } });
  };

  const confirmRemoveItem = (id) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      removeFromCart(id);
    }
  };

  const getTotalCartAmount = () => {
    if (!cart.length) return 0;
    return cart.reduce((acc, item) => {
      const itemTotal = (item.price || 0) * (item.quantity || 0);
      return acc + itemTotal;
    }, 0);
  };

  const increaseQuantity = (id) => {
    updateCartItemQuantity(id, (item) => ({
      ...item,
      quantity: (item.quantity || 0) + 1
    }));
  };

  const decreaseQuantity = (id) => {
    updateCartItemQuantity(id, (item) => {
      const newQuantity = (item.quantity || 0) - 1;
      return { ...item, quantity: Math.max(newQuantity, 1) };
    });
  };

  return (
    <div className="cart-page">
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Menu Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">Rs {item.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => decreaseQuantity(item._id)}
                    disabled={item.quantity <= 1}
                    variant="outlined"
                  >
                    -
                  </Button>
                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                  <Button
                    onClick={() => increaseQuantity(item._id)}
                    variant="outlined"
                  >
                    +
                  </Button>
                </TableCell>
                <TableCell align="right">Rs {(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => confirmRemoveItem(item._id)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Subtotal: Rs {getTotalCartAmount().toFixed(2)}
      </Typography>
      <Typography variant="h6">
        Total (including fee): Rs {(getTotalCartAmount() + 2).toFixed(2)}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
        style={{ marginTop: '20px' }}
      >
        PROCEED TO CHECKOUT
      </Button>
    </div>
  );
};

export default CartPage;
