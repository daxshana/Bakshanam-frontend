import React from 'react';
import './../css/Navbar.css'; 
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useCart } from '../component/CartContexrprovider';

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle logout
  const handleLogout = () => {
      localStorage.removeItem('token'); // Clear the token when user logs out
      navigate('/login'); // Redirect to login page
  };

  // Check if the user is logged in by verifying the presence of the token
  const isLoggedIn = !!localStorage.getItem('token'); // Convert to boolean

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/"> <h1>Bhakshanam <span role="img" aria-label="logo"></span></h1></Link> 
        </div>

        <ul className="navbar-links">
          <Link to="/"> <li>Home</li></Link>


          <Link to="/Menu"> <li>Menu</li></Link>
          <Link to="/Contactus"> <li>Contactus</li></Link>
        </ul>

        <div className="navbar-icons">
          <div className="cart-icon">
            <Link to="/cart">🛒<span>{cart.length}</span></Link>
          </div>

          {isLoggedIn ? (
            // If logged in, show Logout button
            <div className="signin-btn" onClick={handleLogout}>Log Out</div>
          ) : (
            // If not logged in, show Login and Register buttons
            <>
              <Link to="/Login"> <div className="signin-btn">Log In</div> </Link> 
              <Link to="/Register"> <div className="signin-btn">Register</div> </Link> 
              <Link to="/Homemaker"> <div className="signin-btn">Homemaker</div> </Link> 
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
