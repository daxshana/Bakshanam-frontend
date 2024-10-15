import { useState, useEffect } from "react";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); // Add description state
  const [homeMakerName, setHomeMakerName] = useState(""); // Add home maker name state
  const [image, setImage] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    axios.get("http://localhost:5004/api/products")
      .then(response => setProducts(response.data))
      .catch(error => {
        console.error("There was an error fetching the products!", error);
        alert('Failed to fetch products. Please check the server or endpoint.');
      });
  }, []);

  // Delete a product
  const deleteProduct = (id) => {
    console.log(`Deleting product with ID: ${id}`); // Log the ID for debugging
    axios.delete(`http://localhost:5004/api/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(error => {
        console.error("Delete error:", error.response ? error.response.data : error.message);
        alert("Failed to delete the product. Please try again.");
      });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("description", description); // Add description
    formData.append("homeMakerName", homeMakerName); // Add home maker name
    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingProductId) {
        // Update product
        const response = await axios.put(`http://localhost:5004/api/products/${editingProductId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const updatedProduct = response.data;
        setProducts(products.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
      } else {
        // Add new product
        const response = await axios.post('http://localhost:5004/api/products', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const addedProduct = response.data;
        setProducts([...products, addedProduct]);
      }

      // Clear input fields after submission
      setProductName("");
      setPrice("");
      setDescription(""); // Clear description
      setHomeMakerName(""); // Clear home maker name
      setImage(null);
      setEditingProductId(null);
    } catch (error) {
      console.error("Error during handleSubmit:", error);
      alert("There was an error processing your request. Please try again.");
    }
  };

  // Edit product
  const editProduct = (product) => {
    setProductName(product.name);
    setPrice(product.price);
    setDescription(product.description); // Set description
    setHomeMakerName(product.homeMakerName); // Set home maker name
    setEditingProductId(product._id);
  };

  return (
    <div>
      <h2>Manage Products</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={productName}
          placeholder="Product Name"
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="number"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          value={description}
          placeholder="Product Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          value={homeMakerName}
          placeholder="Home Maker Name"
          onChange={(e) => setHomeMakerName(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required={!editingProductId} // Make image required only when adding
        />
        <button type="submit">{editingProductId ? "Update Product" : "Add Product"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Home Maker Name</th> {/* Add column for home maker name */}
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.homeMakerName}</td> {/* Display home maker name */}
              <td>
                {product.imageUrl && (
                  <img src={`http://localhost:5004${product.imageUrl}`} alt={product.name} style={{ width: "50px", height: "50px" }} />
                )}
              </td>
              <td>
                <button onClick={() => editProduct(product)}>Edit</button>
                <button onClick={() => deleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
