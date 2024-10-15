import React from 'react';
import './../css/Navbar.css'; 
import { Link } from 'react-router-dom';
import { useCart } from '../component/CartContexrprovider'; // Correct path



const Navbar = () => {
  const { cart, removeFromCart, getTotalCartAmount } = useCart();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <div className="navbar-logo">
        <Link to="/"> <h1>Bhakshanam <span role="img" aria-label="logo"></span></h1></Link> 
        </div>

        <ul className="navbar-links">
        <Link to="/"> <li>Home</li></Link>
        {/* <Link to="/About"> <li>About</li></Link> */}
        <Link to="/Menu"> <li>Menu</li></Link>
        <Link to="/Contactus"> <li>Contactus</li></Link>
       
        </ul>

        <div className="navbar-icons">
        <Link to="/search">🔍</Link>
          <div className="cart-icon"><Link to="/cart">🛒<span>{cart.length}</span></Link></div>
        <Link to="/Login"> <div className="signin-btn">Log In</div> </Link> 
        <Link to="/Register"> <div className="signin-btn">Register</div> </Link>  
          
         </div>
      </div>
    </nav>
  );
};

export default Navbar;
