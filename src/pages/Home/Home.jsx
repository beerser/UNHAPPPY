import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import iphone_banner from '../../assets/iphone-15-white.png';
import info_icon from '../../assets/info_icon.png';
import Footer from '../../components/Footer/Footer';
import { searchProducts } from '../../firebase'; // นำเข้าฟังก์ชันดึงข้อมูล

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // ประกาศ searchTerm
  const productsRef = useRef(null); // สร้าง ref สำหรับ container

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await searchProducts(searchTerm.toLowerCase());
      // กรองเฉพาะสินค้าที่ชื่อรวม "iphone"
      const filteredProducts = result.filter(product => product.nameProduct.toLowerCase().includes('iphone'));
      setProducts(filteredProducts);
    };

    fetchProducts();
  }, [searchTerm]); // เรียกใช้ fetchProducts เมื่อ searchTerm เปลี่ยน

  // Wheel event handler สำหรับเลื่อนในแนวนอน
  const handleWheel = (event) => {
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
      currentRef.addEventListener('wheel', handleWheel); // เพิ่ม event listener
      return () => {
        currentRef.removeEventListener('wheel', handleWheel); // ทำความสะอาดเมื่อคอมโพเนนต์ถูกทำลาย
      };
    }
  }, []);

  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={iphone_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <div className="hero-btns">
            <button className='btn'>Buy Now</button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt="info" />
              More Info
            </button>
          </div>
        </div>
      </div>
      <div className="more-cards">
        <h2>iPhone Products</h2>
        <div className="product-container" ref={productsRef}>
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.nameProduct} className="product-image" />
                <div className="product-info-container"> {/* Container สำหรับข้อมูลสินค้า */}
                  <div className="product-info">
                    <span>Name: {product.nameProduct}</span>
                    <span>Price: {product.price} ฿</span>
                    {product.stock > 0 ? (
                      <span style={{ color: 'green' }}>In stock: {product.stock}</span>
                    ) : (
                      <span style={{ color: 'red' }}>Out of stock</span>
                    )}
                  </div>
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
