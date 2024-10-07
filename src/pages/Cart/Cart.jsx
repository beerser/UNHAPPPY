import React, { useState, useEffect } from 'react';
import './Cart.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';  
import visa from '../../assets/visa-logo.png';
import mastercard from '../../assets/MasterCard_Logo.png';
import { searchProducts, addToCartAndUpdateStock } from '../../firebase';

const Cart = () => {
  const [products, setProducts] = useState([]); 
  const [cart, setCart] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('iphone'); 

  const navigate = useNavigate();  

  const shippingCost = 10; 

  const subtotal = cart.reduce((total, item) => total + item.price, 0);

  const pretotal = cart.reduce((total, item) =>item.price, 0);
  const total = subtotal + shippingCost;


  useEffect(() => {
    const fetchProducts = async () => {
      const result = await searchProducts(searchTerm);
      setProducts(result);
    };

    fetchProducts(); 
  }, [searchTerm]);


  const handleBuyNow = async (product) => {
    if (product.stock > 0) { 
      await addToCartAndUpdateStock(product.id, 1); 
      setCart((prevCart) => [...prevCart, product]); 
      console.log(`${product.nameProduct} added to cart and stock updated`);
    } else {
      alert('Product is out of stock');
    }
  };

 
  const handleProceedToQR = () => {
    navigate('/qrcode', { state: { total } });  
  };

  return (
    <div className='cart'>
      <div className="nev">
        <Navbar />
      </div>

      <div className="products-list">
        <h2 className='Av'>Available Products:</h2>
        <ul>
          {products.length > 0 ? (
            products.map(product => (
              <li key={product.id}>
                <img src={product.image} alt={product.nameProduct} className="product-image" />
                {product.nameProduct} - {product.price} ฿
                {product.stock > 0 ? (
                  <span style={{ color: 'green' }}> In stock: {product.stock}</span>
                ) : (
                  <span style={{ color: 'red' }}> Out of stock</span>
                )}
                <button 
                  className="buy-now-btn" 
                  onClick={() => handleBuyNow(product)} 
                  disabled={product.stock <= 0} 
                >
                  Add to cart
                </button>
              </li>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </ul>
      </div>

 
      <div className="cart-summary">
        <h2 className='summary'>Cart Summary:</h2>
      </div>

      <div className="cart-container"> 

        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.nameProduct} className="cart-product-image" />
                <div className="product-details">
                  <span>{item.nameProduct}</span>
                  <span>cpu: {item.cpu}</span>
                  <span>ram: {item.ram}</span>
                  <span>rom: {item.rom}</span>
                  <span>sreen: {item.screen_size}</span>
                  <span>battery: {item.battery}</span>
                  <span>price: {item.price} ฿</span>
                </div>
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

    <button onClick={handleProceedToQR}>Process to QR</button> {/* ปุ่มไปที่ QR Code */}
  </div>
</div>


      <Footer />
    </div>
  );
};

export default Cart;
