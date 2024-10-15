// FoodMakersSlideshow.js
import React from 'react';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import "../css/Foodmaker.css"; 

// Import images
import avatar1 from '../img/avathar1.jpg';
import avatar2 from '../img/2fa76ce4014ca4e1699c3ba888dd56f3.jpg';
import avatar3 from '../img/confident-chef-woman-gesturing-ok-600nw-1086436823.webp';
import avatar4 from '../img/confident-chef-woman-holding-pan-600nw-1145057168.webp';
import avatar5 from '../img/360_F_485958082_0f9b5BBZ6oNxbkFeNbRon8oqkOgo94xO.jpg';

// Array of imported avatars
const foodMakers = [avatar1, avatar2, avatar3, avatar4, avatar5];

const FoodMakersSlideshow = () => {
  // Slider settings
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 3, 
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 3000, 
  };

  return (
    <div className="food-makers-slideshow">
      <Slider {...settings}>
        {foodMakers.map((avatar, index) => (
          <div key={index} className="avatar-slide">
            <img src={avatar} alt={`Food Maker ${index + 1}`} className="avatar-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FoodMakersSlideshow;
