import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import iphone_banner from '../../assets/iphone-15-white.png';
import info_icon from '../../assets/info_icon.png';
import op from '../../assets/iPhone_all_new.png';
import Footer from '../../components/Footer/Footer';
import { searchProducts } from '../../firebase'; // นำเข้าฟังก์ชันดึงข้อมูล
import { useNavigate } from 'react-router-dom'; // ใช้นำทาง

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const productsRef = useRef(null);
  const navigate = useNavigate(); // สร้างการนำทาง

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await searchProducts(searchTerm.toLowerCase());
      const filteredProducts = result.filter(product => product.nameProduct.toLowerCase().includes('iphone'));
      setProducts(filteredProducts);
    };

    fetchProducts();
  }, [searchTerm]);

  const handleAddToCart = (product) => {
    // ตรวจสอบว่าตะกร้ามีอยู่หรือไม่ใน localStorage
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];

    // เพิ่มผลิตภัณฑ์ลงในตะกร้า
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
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={iphone_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <div className="capcha"><img src={op} className='caption-img' alt="" />
          <div className="hero-btns">
            <button className='btn'>Buy Now</button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt="info" />
              More Info
            </button>
          </div></div>
        </div>
      </div>
      <div className="more-cards">
        <h2>iPhone Products</h2>
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
                      <span style={{ color: '#2A9D8F' }}>In stock: {product.stock}</span>
                    ) : (
                      <span style={{ color: '#FF6F61' }}>Out of stock</span>
                    )}
                  </div>
                  <button className='add-to-cart-btn' onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No iPhone products found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
