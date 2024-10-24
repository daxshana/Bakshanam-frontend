import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import "../css/Homemaker l.css"

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!isLogin && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!username || !password || (!isLogin && !name)) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setLoading(true); // Start loading
            const url = isLogin 
                ? 'http://localhost:5004/api/homemakeruser/login' 
                : 'http://localhost:5004/api/homemakeruser/register';

            const response = await axios.post(url, { 
                name: isLogin ? undefined : name, 
                username, 
                password,
                role: isLogin ? undefined : 'Homemaker'
            });

            if (response.data.success) {
                alert(isLogin ? 'Login successful!' : 'Registration successful!');
                if (isLogin) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', username);
                    if (localStorage.getItem('token')) {
                        navigate('/homemakerdashboard/*', { state: { username: username } });
                    }
                } else {
                    setName('');
                    setUsername('');
                    setPassword('');
                    setConfirmPassword('');
                    setIsLogin(true); // Switch to login mode after registration
                }
            } else {
                setError(response.data.message || 'Operation failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.message || 'Server error. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <Box className="auth-container" sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" gutterBottom>
                    {isLogin ? 'Login' : 'Register'}
                </Typography>
                {!isLogin && (
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {!isLogin && (
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                )}
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ marginTop: 2 }} 
                    disabled={loading} // Disable during loading
                >
                    {loading ? <CircularProgress size={24} /> : (isLogin ? 'Login' : 'Register')}
                </Button>
                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                <Typography variant="body2" sx={{ mt: 2 }}>
                    {isLogin ? 'Don\'t have an account?' : 'Already have an account?'} 
                    <Button type="button" onClick={() => setIsLogin(!isLogin)} color="primary">
                        {isLogin ? 'Register' : 'Login'}
                    </Button>
                </Typography>
            </form>
        </Box>
    );
};

export default Auth;
