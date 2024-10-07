import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
      <a href="https://web.facebook.com/bearjaiton"><img src={facebook_icon} alt="" /></a>
      <a href="https://www.instagram.com/stories/wiiinwildan/"><img src={instagram_icon} alt="" /></a>
      <a href="https://www.instagram.com/ohmpstnnx_?fbclid=IwY2xjawFulz9leHRuA2FlbQIxMAABHSiXOCdTyKF0wVYxtO9CfKfYLVOBVLCWB25FZ85t8dx8OWvRmjbI3LQTTw_aem_Wkr_QqJJSuOk7ZTlgEFz3g"><img src={twitter_icon} alt="" /></a>
      <a href="https://www.youtube.com/watch?v=xTIdVRhj5YU"><img src={youtube_icon} alt="" /></a>
      </div>
      <ul>
        
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>Phubet Kerdsathi .inc</p>
    </div>
  )
}

export default Footer
