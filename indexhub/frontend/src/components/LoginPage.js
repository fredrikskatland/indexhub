import React, { useState, useContext  } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography, TextField, Button, Paper } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { AuthContext  } from './AuthContext'; // Import AuthProvider

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate ();
    const { setIsAuthenticated, setUsername } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/accounts/login/', { email, password });
            localStorage.setItem('token', response.data.access);

            // Update the authentication state
            setIsAuthenticated(true);
            setUsername(response.data.username); // Replace with actual username field from response

            navigate('/'); // Front page route

        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error);
            }
        }
    };

    return (
        // Similar JSX layout as RegistrationPage but with only email and password fields
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
            }}
        >
            <Header />
            <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 2 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h5" align="center" color="primary" gutterBottom>
                        Login
                    </Typography>
                    {errorMessage && 
                        <Typography color="error" align="center">
                            {errorMessage}
                        </Typography>
                    }
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
};

export default LoginPage;
