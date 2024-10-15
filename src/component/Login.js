import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ensure this import is present
import '../css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5004/api/auth/login', { email, password });

            if (response.data.success) {
                alert('Login successful!');
                setError('');

                localStorage.setItem('token', response.data.token);

                // Redirect based on user role
                switch (response.data.role) {
                    case 'Admin':
                        navigate('/dashboard');
                        break;
                    case 'User':
                        navigate('/');
                        break;
                    default:
                        navigate('/'); // Fallback route if role is unknown
                        break;
                }
            } else {
                setError(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error response:', error.response);
            const errorMessage = error.response?.data?.message || 'Server error. Please try again later.';
            setError(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
            <h2>Login</h2>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
