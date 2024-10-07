import React from 'react'
import './Collections.css'
import Navbar from '../../components/Navbar/Navbar'
import iphone_banner from '../../assets/iphone-15-white.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
function Collections() {
  return (
    <div className='collections'>
    <div className="nav"><Navbar/></div>
    <div className="coll">
        <TitleCards title={"iPhone"}/>
        <TitleCards title={"Samsung"}/>
        <TitleCards title={"Xaiomi"}/>
    </div>
    </div>
  )
}

export default Collections
