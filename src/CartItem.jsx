import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // Costs are stored as strings such as "$15", so strip the symbol before doing math.
  const parseCost = (cost) => parseFloat(cost.substring(1));

  const calculateItemTotal = (item) => parseCost(item.cost) * item.quantity;

  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateItemTotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2 className="cart-total">Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit price: {item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Total: ${calculateItemTotal(item).toFixed(2)}
                </div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button className="continue-shopping" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
