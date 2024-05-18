import React from 'react'
import "./Footer.css"


function Footer() {
  return (
    <div className='footer '>
      <div className="container mx-auto px-4">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Cleaning</span>
            <span>Repair</span>
            <span>Painting</span>
            <span>Plumbing</span>
            <span>Electric</span>
          </div>
          <div className="item">
            <h2>Discover</h2>
            <span>Become a Tasker</span>   
            <span>Services By City</span>
            <span>All Services</span>
            <span>Elite Taskers</span>
            <span>Help</span>
          </div>
          
          <div className="item">
            <h2>Company</h2>
            <span>About Us</span>
            <span>Careers</span>
            <span>Press</span>
            <span>Taskrabbit for Good</span>
            <span>Blog</span>
          </div>
          









          <div className="item">
            <h2>Terms& Privacy</h2>
            <span>California Consumer Notice</span>
            <span>Do Not Sell My Personal Information</span>
            <span>Legal</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <img
              src="/logo.svg"
              alt="logo"
              sizes="100vh"
              width={120}
              height={70}
            />
          <span>© International Ltd. 2024</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer