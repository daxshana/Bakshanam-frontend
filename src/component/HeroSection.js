import React from 'react';
import { Link } from 'react-router-dom';
import './../css/HeroSection.css'; 
import Feature from "./FeatureSection";
import About from "../component/About"; // Ensure this path is correct
import ContactUsPage from '../component/Contactus'; // Ensure correct casing

const HeroSection = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>
            Be The Fastest In Delivery Your <span>Food</span>
          </h1>
          <Link to="/menu">
            <button className="get-started-btn">Our Menu</button>
          </Link>
        </div>

        <div className="hero-images">
          {/* You can add images here */}
          {/* Add more images as needed */}
        </div>
      </section>
      <About />
      <Feature />
   {/* Add the About component here */}
      <ContactUsPage /> {/* Corrected casing here */}
    </>
  );
};

export default HeroSection;
