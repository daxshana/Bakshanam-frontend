import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import girlPhoto from '../img/Title-Image_80464696efa86.jpg'; // Image path

const testimonialsData = [
  {
    text: "At Bhakshanam, we believe that food should be simple, delicious, and made with love. Our mission is to bring you homemade meals that are crafted from fresh, local ingredients, providing the comfort and warmth of home-cooked food.",
    id: 1,
  },
  {
    text: "We understand the struggle of finding healthy meal options in a busy world. That’s why we connect you with talented homemakers who create tasty dishes that nourish both body and soul.",
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
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <Box id="testimonials" sx={{ py: 5, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
       About us
        </Typography>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={girlPhoto}
                alt="Happy Customer"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 3 }}>
              “{testimonialsData[currentIndex].text}”
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="outlined" sx={{ mx: 1 }} onClick={handlePrevious}>
            <ArrowBackIcon />
          </Button>
          <Button variant="outlined" sx={{ mx: 1 }} onClick={handleNext}>
            <ArrowForwardIcon />
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
