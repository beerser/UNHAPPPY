import React from 'react';
import './Samsung.css';
import Navbar from '../../components/Navbar/Navbar';
import iphone_banner from '../../assets/samsung-lung-dome.jpg';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import op from '../../assets/iPhone_all_new.png';


function Samsung() {
  return (
    <div className='samsung'>
      <Navbar />
      <div className="hero2">
        <img src={iphone_banner} alt="" className='banner-img2' />
        <div className="hero-caption2">
        <img src={op}  className='caption-img2' alt="" />
          <div className="hero-btns2">
            <button className='btn2'>Buy Now</button>
            <button className='btn2 dark-btn2'>
              <img src={info_icon} alt="" />More Info
            </button>
          </div>
          <TitleCards  />
        </div>
        
      </div>
      <div className="more-cards">
        <TitleCards title={"New Series"} />
        <TitleCards title={"Only this month"} />
        <TitleCards title={"Upcoming"} />
      </div>
    </div>
  );
}

export default Samsung;
