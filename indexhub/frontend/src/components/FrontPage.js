import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const FrontPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh', // Sets the minimum height to 100% of the viewport height
        width: '100vw', // Sets the width to 100% of the viewport width
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default', // Use the default background color
      }}
    >
      <Header />
      <Container component="main" maxWidth="sm" sx={{ flex: 1, textAlign: 'center', py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Welcome to IndexHub
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Your central hub for managing vector data.
        </Typography>
        <Typography paragraph sx={{ color: 'text.secondary' }}>
          Explore our collection, create your own entries, and join the community of vector enthusiasts.
        </Typography>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Button variant="contained" color="success" size="large" component={RouterLink} to="/create">
            Create Entry
          </Button>
          <Button variant="outlined" color="success" size="large" component={RouterLink} to="/list">
            View List
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default FrontPage;
