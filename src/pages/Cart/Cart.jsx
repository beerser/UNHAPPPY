import React, { useState, useEffect } from 'react';  
import './Cart.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';  
import { searchProducts } from '../../firebase';

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }); 

  const navigate = useNavigate();  
  const shippingCost = 10; 
  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const total = subtotal + shippingCost;

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleProceedToQR = () => {
    if (cart.length > 0) {
      navigate('/qrcode', { state: { total } });
    } else {
      alert('Your cart is empty!');
    }
  };

  return (
    <div className='cart'>
      <Navbar />
      <div className="cart-summary">
        <h2 className='summary'>Cart Summary:</h2>
      </div>

      <div className="cart-container"> 
        <div className="payment-details">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div className="product-item" key={index}>
                <img src={item.image} alt={item.nameProduct} className="product-image" />
                <div className="product-details">
                  <span>{item.nameProduct}</span>
                  <span>CPU: {item.cpu}</span>
                  <span>RAM: {item.ram}</span>
                  <span>ROM: {item.rom}</span>
                  <span>Screen: {item.screen_size}</span>
                  <span>Battery: {item.battery}</span>
                  <span>Price: {item.price} ฿</span>
                </div>
                <button className="remove-btn" onClick={() => handleRemoveFromCart(index)}>
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className="payment-details">
          <div className="cart-summary">
            <p>Subtotal</p>
            <h3>{subtotal} ฿</h3>
          </div>

          <div className="cart-summary">
            <p>Shipping</p>
            <p>{shippingCost} ฿</p>
          </div>

          <div className="cart-summary">
            <p>Total</p>
            <h3>{total} ฿</h3>
          </div>

          <button onClick={handleProceedToQR}>Process to QR</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
