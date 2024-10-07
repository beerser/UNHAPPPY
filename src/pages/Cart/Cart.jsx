import React, { useState, useEffect, useRef } from 'react'; 
import './Cart.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';  
import { searchProducts, addToCartAndUpdateStock } from '../../firebase';

const Cart = () => {
  const [products, setProducts] = useState([]); 
  const [cart, setCart] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const productsRef = useRef(null); // Reference for container of product list

  const navigate = useNavigate();  

  const shippingCost = 10; 

  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const total = subtotal + shippingCost;

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await searchProducts(searchTerm.toLowerCase());
      setProducts(result);
    };

    fetchProducts();
  }, [searchTerm]);

  // Wheel event handler for scrolling
  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      productsRef.current.scrollTop += 100; // Scroll down
    } else {
      productsRef.current.scrollTop -= 100; // Scroll up
    }
  };

  useEffect(() => {
    const currentRef = productsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel); // Add wheel event listener
      return () => {
        currentRef.removeEventListener('wheel', handleWheel); // Clean up event when component unmounts
      };
    }
  }, []);

  const handleBuyNow = async (product) => {
    if (product.stock > 0) { 
      await addToCartAndUpdateStock(product.id, 1); 
      setCart((prevCart) => [...prevCart, product]); 
      alert(`${product.nameProduct} added to cart`); // Show alert when added to cart
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

      {/* Container for available products */}
      <div className="products-list" ref={productsRef}>
        <h2 className='Av'>Available Products:</h2>
        <ul>
          {products.length > 0 ? (
            products.map(product => (
              <li key={product.id} className="product-item">
                <img src={product.image} alt={product.nameProduct} className="product-image" />
                <div className="product-info">
                  <span>{product.nameProduct}</span>
                  <span>Price: {product.price} ฿</span>
                  {product.stock > 0 ? (
                    <span style={{ color: 'green' }}>In stock: {product.stock}</span>
                  ) : (
                    <span style={{ color: 'red' }}>Out of stock</span>
                  )}
                </div>
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
              <div className="product-item">
                <img src={item.image} alt={item.nameProduct} className="product-image" />
                <div className="product-details">
                  <span>{item.nameProduct}</span>
                  <span>cpu: {item.cpu}</span>
                  <span>ram: {item.ram}</span>
                  <span>rom: {item.rom}</span>
                  <span>screen: {item.screen_size}</span>
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

          <button onClick={handleProceedToQR}>Process to QR</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
