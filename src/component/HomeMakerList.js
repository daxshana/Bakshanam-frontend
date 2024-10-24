
import React from "react";
import { Button, Table, Alert } from "react-bootstrap";

const HomeMakerList = ({ homeMakers, onEditHomeMaker, onDeleteHomeMaker }) => {
  return (
    <div>
      <h2>Home Makers</h2>
      {homeMakers.length === 0 ? (
        <Alert variant="info">No home makers found.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {homeMakers.map((homeMaker) => (
              <tr key={homeMaker._id}> {/* Use _id instead of id */}
                <td>{homeMaker.name}</td>
                <td>{homeMaker.description}</td>
                <td>
                  {homeMaker.imageUrls && homeMaker.imageUrls.length > 0 ? (
                    homeMaker.imageUrls.map((image, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5004/${image}`}
                        alt={`Image ${index}`}
                        width="50"
                      />
                    ))
                  ) : (
                    <span>No Images</span>
                  )}
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => onEditHomeMaker(homeMaker)} // Edit handler
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDeleteHomeMaker(homeMaker._id)} // Use _id for delete handler
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default HomeMakerList;
