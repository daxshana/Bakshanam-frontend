import React from 'react';
import '../css/Footer.css'; 
// import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';




const Footer = () => {
  return (
    <footer className="footer bg-light text-center">
      <div className="container ">
        {/* Contact Section */}
        <div className="footer-content d-flex justify-content-between align-items-start">
          <div className="footer-column">
            <h5 className="footer-logo">Bhakshanam </h5>
            
            <div className="social-icons mt-3">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
        <i className="fab fa-facebook"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
        <i className="fab fa-twitter"></i>
      </a>
    </div>
          </div>

         
          <div className="footer-column">
            <h5>Company</h5>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#career">Contact Us</a></li>
             
            </ul>
          </div>

          
          <div className="footer-column">
            <h5>Policy</h5>
            <ul className="footer-links">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#shipping">Shipping</a></li>
            </ul>
          </div>

         
          <div className="footer-column">
            <h5>Bhakshanam</h5>
            <p>0766747785</p>
            <p>Bhakshanam@gmail.com</p>
          </div>
        </div>
      </div>

      {/* <div className="footer-bottom py-3" style={{ backgroundColor: '#647C4C)' }}>
        <p>© 2024 Bhakshanam. ALL RIGHTS RESERVED.</p>
      </div> */}
    </footer>
  );
};

export default Footer;
