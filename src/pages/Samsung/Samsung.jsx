import React, { useEffect, useState, useRef } from 'react';
import './Samsung.css';
import Navbar from '../../components/Navbar/Navbar';
import iphone_banner from '../../assets/samsung-lung-dome.jpg';
import info_icon from '../../assets/info_icon.png';
import Footer from '../../components/Footer/Footer';
import opp from '../../assets/b0b60c2d2818953a248f765f875a5e94.png';
import { searchProducts } from '../../firebase'; // นำเข้าฟังก์ชันดึงข้อมูล
import { useNavigate } from 'react-router-dom'; // ใช้นำทาง

function Samsung() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const productsRef = useRef(null);
  const navigate = useNavigate(); // สร้างการนำทาง
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await searchProducts(searchTerm.toLowerCase());
      const filteredProducts = result.filter(product => product.nameProduct.toLowerCase().includes('samsung'));
      setProducts(filteredProducts);
    };


    fetchProducts();
  }, [searchTerm]);

  const handleAddToCart = (product) => {
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];

    const updatedCart = [...cart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // บันทึกตะกร้าใน localStorage
    alert(`${product.nameProduct} added to cart`); // แจ้งเตือนเมื่อเพิ่มสินค้า

    navigate('/cart'); // นำทางไปยังหน้าตะกร้า
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (productsRef.current) {
      if (event.deltaY > 0) {
        productsRef.current.scrollLeft += 100; // Scroll right
      } else {
        productsRef.current.scrollLeft -= 100; // Scroll left
      }
    }
  };

  useEffect(() => {
    const currentRef = productsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
      return () => {
        currentRef.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  return (
    <div className='samsung'>
      <Navbar />
      <div className="hero2">
        <img src={iphone_banner} alt="" className='banner-img2' />
        <div className="hero-caption2">
          <img src={opp} className='capn-img2' alt="" />
          <div className="hero-btns2">
            <button className='btn2'><a href="/collections"> Buy Now </a></button>
            <button className='btn2 dark-btn2'>
              <img src={info_icon} alt=""/>
              <a href="/collections"> More Info </a>
            </button>
          </div>
        </div>
      </div>
      <div className="more-cards">
        <h2>Samsung Products</h2>
        <div className="product-container" ref={productsRef}>
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="product-item2">
                <img src={product.image} alt={product.nameProduct} className="product-image" />
                <div className="product-info-container">
                  <div className="product-info">
                    <span>Name: {product.nameProduct}</span>
                    <span>Price: {product.price} ฿</span>
                    {product.stock > 0 ? (
                      <span style={{ color: 'green' }}>In stock: {product.stock}</span>
                    ) : (
                      <span style={{ color: 'red' }}>Out of stock</span>
                    )}
                  </div>
                  <button className='add-to-cart-btn' onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No Samsung products found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Samsung;
