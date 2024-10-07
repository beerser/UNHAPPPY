import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Samsung from './pages/Samsung/Samsung'
import Xiaomi from './pages/Xiaomi/Xiaomi'
import Collections from './pages/Collections/Collections'
import Cart from './pages/Cart/Cart'
import Qrcode from './pages/Qrcode/Qrcode'
import Success from './pages/Success/Success'
import Profile from './pages/Profile/Profile'


import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const App = () => {

  
  const navigate = useNavigate();
  const location = useLocation();
  
  const addToCartAndNavigate = async (productId, quantity) => {
    try {
      await addToCartAndUpdateStock(productId, quantity);
      console.log("Product added to cart and stock updated!");
  
      // นำทางไปยังหน้าตะกร้าและส่งข้อมูลไปด้วย
      navigate('/cart', { state: { productId, quantity } });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        if (location.pathname === '/login') {
          navigate('/');
        }
      } else {
        console.log("Logged Out");
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    })

  }, [location, navigate])

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/samsung' element={<Samsung />} />
        <Route path='/xiaomi' element={<Xiaomi />} />
        <Route path='/collections' element={<Collections />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/qrcode' element={<Qrcode />} />
        <Route path='/success' element={<Success/>} />
        <Route path='/success' element={<Profile/>} />
      </Routes>
    </div>
  )
}

export default App;
