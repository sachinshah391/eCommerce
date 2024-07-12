import React from "react";
import { useCart } from "../context/CartContext";
import "../themes/Cart.css";
import emptyCartSvg from "../assets/empty-cart_icon.svg";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (
    productId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(event.target.value);
    updateQuantity(productId, newQuantity);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className={`cart-container ${cartItems.length===0 ? 'empty-cart' : ''}`}>
      {cartItems.length === 0 ? (
        <>
          <h3 style={{textAlign: 'center'}}>Your cart is empty</h3>
          <img
            src={emptyCartSvg}
            alt="Empty Cart"
            className="empty-cart-image"
          />
        </>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      className="dec-quantity"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e)}
                    />
                    <button
                      className="add-quantity"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${calculateTotal()}</h3>
            <button onClick={handleClearCart} className="clear-cart-button">
              Clear Cart
            </button>
            <button className="checkout-button">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
