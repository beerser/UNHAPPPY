import React from 'react';
import './Xiaomi.css';
import Navbar from '../../components/Navbar/Navbar';
import iphone_banner from '../../assets/xiaomi-kab-shop.jpg';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import op from '../../assets/iPhone_all_new.png';

function Xiaomi() {
  return (
    <div className='xiaomi'>
      <Navbar />
      <div className="hero1">
        <img src={iphone_banner} alt="" className='banner-img1' />
        <div className="hero-caption1">
        <img src={op}  className='caption-img1' alt="" />
          <div className="hero-btns1">
            <button className='btn1'> Buy  </button>
            <button className='btn1 drak-btn1'>
              <img src={info_icon} alt="" />More Info
            </button>
          </div>
          <TitleCards />
        </div>ß
      </div>
      <div className="more-cards">
        <TitleCards title={"New Series"} />
        <TitleCards title={"Only this month"} />
        <TitleCards title={"Upcoming"} />
      </div>

      <Footer />
    </div>
  );
}

export default Xiaomi;
