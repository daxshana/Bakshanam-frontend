import React, { useEffect, useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../css/Menu.css";

const Menu = () => {
  const [homeMakers, setHomeMakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeMakers = async () => {
      try {
        const response = await fetch('http://localhost:5004/api/home-makers/getHomeMakers');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched home makers:", data);
        setHomeMakers(data);
      } catch (err) {
        console.error('Error fetching home makers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeMakers();
  }, []);

  const handleViewHomeMaker = (homeMakerId, homeMakerName) => {
    const token = localStorage.getItem('token'); // Check if the user is logged in
    if (!token) {
      alert('You need to log in to view this home maker.');
      return; // Prevent navigation if not logged in
    }
    navigate(`/Foodview/${homeMakerId}`, { state: { name: homeMakerName } });
    console.log(homeMakerId); // Navigate to Foodview with homeMakerId
  };

  return (
    <section id='HomeMakers' className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Featured Home Makers</h2>
        <div className="row">
          {loading ? (
            <p className="text-center">Loading home makers...</p>
          ) : (
            homeMakers.length > 0 ? (
              homeMakers.map((homeMaker) => (
                <div key={homeMaker._id} className="col-md-4 mb-4">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:5004/${homeMaker.imageUrls?.[0] || 'placeholder.png'}`}
                      alt={homeMaker.name}
                    />
                    <Card.Body>
                      <Card.Title>{homeMaker.name}</Card.Title>
                      <Card.Text>{homeMaker.description || 'Specializing in homemade products'}</Card.Text>
                      <Button variant="link" onClick={() => handleViewHomeMaker(homeMaker._id, homeMaker.name)}>
                        View Home Maker
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-center">No home makers found.</p>
            )
          )}
        </div>
      </Container>
    </section>
  );
};

export default Menu;
