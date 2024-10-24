import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const AddHomeMaker = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddHomeMaker = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        if (images.length === 0) {
            setErrorMessage('Please upload at least one image.');
            return;
        }

        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await fetch('http://localhost:5004/api/home-makers/addHomeMaker', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setSuccessMessage('Home maker added successfully!');
                setErrorMessage('');
                console.log('HomeMaker added:', result);
            } else {
                const errorData = await response.json();
                throw new Error('Failed to add HomeMaker: ' + (errorData.message || 'Unknown error'));
            }
        } catch (error) {
            setErrorMessage('Failed to add Home maker. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <Form onSubmit={handleAddHomeMaker}>
            <Form.Group controlId="formHomeMakerName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formHomeMakerDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formHomeMakerImages">
                <Form.Label>Images</Form.Label>
                <Form.Control type="file" multiple onChange={(e) => setImages([...e.target.files])} required />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Home Maker
            </Button>
            {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
        </Form>


    );
};

export default AddHomeMaker;
