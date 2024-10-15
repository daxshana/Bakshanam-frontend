import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../component/CartContexrprovider'; // Adjust the path if necessary
import axios from 'axios';
import '../css/Menu.css'; // Ensure this path is correct
import { FaHeart, FaStar } from 'react-icons/fa'; // Import heart and star icons

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]); // Use state to store fetched products
  const navigate = useNavigate();
  const { addToCart, cartItems = [] } = useCart(); // Default empty array if cartItems is undefined

  // State for favorite items
  const [favorites, setFavorites] = useState(new Set());

  // Fetch products from the backend
  useEffect(() => {
    axios.get("http://localhost:5004/api/products")
      .then(response => {
        console.log(response.data); // Check if image URLs are correct
        setMenuItems(response.data); // Set products from API response
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    // alert(`${item.name} has been added to the cart!`);
  };

  const handleViewCart = () => {
    navigate('/cart'); // Function to navigate to the cart page
  };

  // Toggle favorite status
  const toggleFavorite = (itemId) => {
    const updatedFavorites = new Set(favorites);
    if (updatedFavorites.has(itemId)) {
      updatedFavorites.delete(itemId);
    } else {
      updatedFavorites.add(itemId);
    }
    setFavorites(updatedFavorites);
  };

  return (
    <div className="menu-page">
      <main className="menu-content">
        {menuItems.map(item => (
          <div key={item._id} className="menu-item"> {/* Use _id from database */}
            {/* Display the product image */}
            {item.imageUrl && (
              <img 
                src={`http://localhost:5004${item.imageUrl}`} // Ensure proper image path
                alt={item.name}
                className="product-image"
              />
            )}
            <h2>{item.name}</h2>
            <p className="price">Rs {item.price}</p>
            <p className="description">{item.description}</p> {/* Add description */}
            <p className="home-maker">Home Maker: {item.homeMakerName}</p> {/* Add home maker name */}
            <div className="item-actions">
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              <span 
                className={`favorite-icon ${favorites.has(item._id) ? 'active' : ''}`} 
                onClick={() => toggleFavorite(item._id)}
              >
                <FaHeart />
              </span>
              <span className="rating-icon">
                <FaStar />
              </span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MenuPage;
