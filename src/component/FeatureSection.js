// FeaturesSection.js
import React from 'react';
import '../css/ FeaturesSection.css';
import order from "./../img/order.png"
import image1 from "./../img/images.png"
import image2 from"./../img/image2.jpeg"
const FeaturesSection = () => {
  return (
    <section className="features">
      <h5>How It Works</h5>
      <h2>What we serve</h2>
      <p>Product quality is our priority, and always guarantees freshness and safety until it is in your hands.</p>
      <div className="features-list">
        <div className="feature-item">
          <img src={order}alt="Easy to Order" />
          <h3>Easy To Order</h3>
          <p>You only order through the app</p>
        </div>
        <div className="feature-item">
          <img src={image1} alt="Fastest Delivery" />
          <h3>Fastest Delivery</h3>
          <p>Delivery will be on time</p>
        </div>
        <div className="feature-item">
          <img src={image2} alt="Best Quality" />
          <h3>Best Quality</h3>
          <p>The best quality of food for you</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
