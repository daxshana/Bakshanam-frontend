import React from 'react';
import { useCart } from '../component/CartContexrprovider';
import { useNavigate } from 'react-router-dom';
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
      <h1 className="cart-title">Cart</h1>
      <main>
        <h2 className="cart-items-title">Items</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>Rs{item.price.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    disabled={item.quantity <= 1}
                    className="Quantity"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="Quantity"
                  >
                    +
                  </button>
                </td>
                <td>Rs{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => confirmRemoveItem(item._id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="cart-totals-title">Cart Totals</h2>
        <div className="cart-totals">
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <p>Rs{getTotalCartAmount().toFixed(2)}</p>
          </div>
          <div className="cart-total">
            <span>Total</span>
            <b>Rs{(getTotalCartAmount() + 2).toFixed(2)}</b> {/* Adding a flat fee */}
          </div>
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>
          PROCEED TO CHECKOUT
        </button>
      </main>
    </div>
  );
};

export default CartPage;