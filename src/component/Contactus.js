import React, { useState } from 'react';
import '../css/Contactus.css'; // Make sure to include your CSS file

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phone)) errors.phone = 'Phone number is invalid';
    if (!formData.message || formData.message.length < 10) errors.message = 'Message must be at least 10 characters long';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission, e.g., send data to server
      setSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="contact-container">
      {submitted && <p className="success-message">Your message has been sent successfully!</p>}
      <form onSubmit={handleSubmit} className="contact-form">
      <h1>Contact Us</h1>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={formErrors.name ? 'error' : ''}
          />
          {formErrors.name && <p className="error-message">{formErrors.name}</p>}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={formErrors.email ? 'error' : ''}
          />
          {formErrors.email && <p className="error-message">{formErrors.email}</p>}
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={formErrors.phone ? 'error' : ''}
          />
          {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={formErrors.message ? 'error' : ''}
          ></textarea>
          {formErrors.message && <p className="error-message">{formErrors.message}</p>}
        </label>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
