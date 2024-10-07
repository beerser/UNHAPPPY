import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import iphone_banner from '../../assets/iphone-15-white.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import op from '../../assets/iPhone_all_new.png';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={iphone_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={op}  className='caption-img' alt="" />
          <div className="hero-btns">
            <button className='btn'>Buy Now</button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt="info" />
              More Info
            </button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"New Series"} />
        <TitleCards title={"Only this month"} />
        <TitleCards title={"Upcoming"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
