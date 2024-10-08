import React, { useState, useEffect, useRef } from 'react';
import './Collections.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { searchProducts } from '../../firebase'; // นำเข้าฟังก์ชันดึงข้อมูล
import { useNavigate } from 'react-router-dom'; // ใช้นำทาง

function Collections() {
  const [products, setProducts] = useState([]);
  const samsungRef = useRef(null);
  const iphoneRef = useRef(null);
  const xiaomiRef = useRef(null);
  const navigate = useNavigate(); // สร้างการนำทาง

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await searchProducts(''); // ค้นหาผลิตภัณฑ์ทั้งหมด
      setProducts(result);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];

    const updatedCart = [...cart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // บันทึกตะกร้าใน localStorage
    alert(`${product.nameProduct} added to cart`); // แจ้งเตือนเมื่อเพิ่มสินค้า

    navigate('/cart'); // นำทางไปยังหน้าตะกร้า
  };

  const handleWheel = (event, ref) => {
    event.preventDefault();
    if (ref.current) {
      if (event.deltaY > 0) {
        ref.current.scrollLeft += 100; // Scroll right
      } else {
        ref.current.scrollLeft -= 100; // Scroll left
      }
    }
  };

  useEffect(() => {
    const refs = [samsungRef.current, iphoneRef.current, xiaomiRef.current];
    refs.forEach(ref => {
      if (ref) {
        ref.addEventListener('wheel', (e) => handleWheel(e, { current: ref }));
      }
    });
    return () => {
      refs.forEach(ref => {
        if (ref) {
          ref.removeEventListener('wheel', handleWheel);
        }
      });
    };
  }, []);

  // ฟังก์ชันสำหรับการแสดงผลิตภัณฑ์แต่ละหมวดหมู่
  const renderProductSection = (categoryName, filterKey, ref) => (
    <div className="more-cards">
      <h2>{categoryName} Products</h2>
      <div className="product-container" ref={ref}>
        {products.filter(product => product.nameProduct.toLowerCase().includes(filterKey.toLowerCase())).length > 0 ? (
          products
            .filter(product => product.nameProduct.toLowerCase().includes(filterKey.toLowerCase()))
            .map(product => (
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
          <p>No {categoryName} products found.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className='collections'>
      <div className="nav"><Navbar/></div>
      <div className="coll">
        {renderProductSection('iPhone', 'iphone', iphoneRef)}
        {renderProductSection('Samsung', 'samsung', samsungRef)}
        {renderProductSection('Xiaomi', 'xiaomi', xiaomiRef)}
      </div>
      <Footer />
    </div>
  );
}

export default Collections;
