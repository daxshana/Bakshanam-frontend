// ContactUsPage.js
import React from "react";
import { Box, Grid } from "@mui/material";
import ContactForm from "../component/contactform";
import contactImage from "../img/22320ae1812ec585b6304a5514d92a3f (1).gif"; // Import the image

const ContactUsPage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img
            src={contactImage} // Using the imported image variable
            alt="Delicious Food"
            style={{
              borderRadius: "50%",
              width: "100%",
              height: "auto",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUsPage;
