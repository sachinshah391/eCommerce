import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "../themes/Navbar.css";
import Logo from "../assets/site_logo.svg";

const Navbar: React.FC = () => {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img
            src={Logo}
            alt="Empty Cart"
            className="empty-cart-image"
            style={{ width: "50px", height: "50px" }}
          />
          <span className="site-name">ShopStyle</span>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={24} />
          <span className="navbar-cart-count">{cartItemCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
