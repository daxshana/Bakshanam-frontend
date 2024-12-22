import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight, FiAward, FiUsers, FiTruck, FiHeart } from "react-icons/fi";
import girlPhoto from "../img/_.jpeg";

const testimonialsData = [
  {
    text: "At Bhakshanam, we believe that food should be simple, delicious, and made with love. Our mission is to bring you homemade meals that are crafted from fresh, local ingredients, providing the comfort and warmth of home-cooked food.",
    id: 1,
  },
  {
    text: "We understand the struggle of finding healthy meal options in a busy world. That's why we connect you with talented homemakers who create tasty dishes that nourish both body and soul.",
    id: 2,
  },
  {
    text: "Every meal from Bhakshanam is a delightful experience, filled with flavors that remind me of home. I love the variety and quality of the dishes!",
    id: 3,
  },
  {
    text: "The convenience of having homemade meals delivered is amazing! I highly recommend Bhakshanam to anyone looking for delicious and healthy food.",
    id: 4,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setFade(true), 300);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length), 300);
  };

  const handlePrevious = () => {
    setFade(false);
    setTimeout(() => setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length), 300);
  };

  const styles = {
    section: {
      padding: "80px 24px",
      background: "linear-gradient(135deg, #FBFBFB 0%, #F8F8F8 100%)",
      position: "relative",
      overflow: "hidden",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
    },
    content: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "64px",
      alignItems: "center",
    },
    contentMobile: {
      display: "flex",
      flexDirection: "column",
      gap: "32px",
      alignItems: "center",
      textAlign: "center",
    },
    imageSection: {
      position: "relative",
    },
    mainImage: {
      width: "100%",
      height: "auto",
      borderRadius: "24px",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    },
    textContent: {
      padding: "20px",
    },
    title: {
      fontSize: "40px",
      fontWeight: "800",
      color: "#151419",
      marginBottom: "24px",
      lineHeight: 1.2,
    },
    titleMobile: {
      fontSize: "28px",
      marginBottom: "16px",
    },
    testimonial: {
      fontSize: "18px",
      color: "#787878",
      lineHeight: 1.6,
      marginBottom: "40px",
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.3s ease",
    },
    features: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "24px",
    },
    featuresMobile: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    feature: {
      display: "flex",
      alignItems: "flex-start",
      gap: "16px",
    },
    navigation: {
      display: "flex",
      gap: "16px",
      marginTop: "32px",
      justifyContent: "center",
    },
    navButton: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      backgroundColor: "#FBFBFB",
      border: "2px solid #F56E5F",
      color: "#F56E5F",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };

  const isMobile = window.innerWidth < 768;

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={isMobile ? styles.contentMobile : styles.content}>
          <div style={styles.imageSection}>
            <img src={girlPhoto} alt="Happy Customer" style={styles.mainImage} />
          </div>
          <div style={styles.textContent}>
            <h2 style={isMobile ? styles.titleMobile : styles.title}>
              We Provide Best Home-Made Food For Any Purpose
            </h2>
            <p style={styles.testimonial}>{testimonialsData[currentIndex].text}</p>
            <div style={isMobile ? styles.featuresMobile : styles.features}>
              {/* Feature Items */}
              <div style={styles.feature}>
                <FiUsers size={24} />
                <p>Expert Chefs</p>
              </div>
            </div>
            <div style={styles.navigation}>
              <div style={styles.navButton} onClick={handlePrevious}>
                <FiArrowLeft size={24} />
              </div>
              <div style={styles.navButton} onClick={handleNext}>
                <FiArrowRight size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
