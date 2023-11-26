import React, { useContext  } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import AuthProvider


const Header = () => {
  const { isAuthenticated, username, logout } = useContext(AuthContext);
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'primary.dark',
        color: 'common.white',
        py: 2, // vertical padding
        px: 3, // horizontal padding, increase this value for more padding
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography 
        variant="h6" 
        component={RouterLink} 
        to="/" 
        sx={{ 
          marginLeft: '1rem', 
          textDecoration: 'none', 
          color: 'inherit' 
        }}
      >
        IndexHub
      </Typography>
      <Box>
        <Button color="inherit" component={RouterLink} to="/list" sx={{ marginRight: '1rem' }}> {/* Add margin to the right */}
          List
        </Button>
        <Button color="inherit" component={RouterLink} to="/create" sx={{ marginRight: '1rem' }}> {/* Add margin to the right */}
          Create
        </Button>
      </Box>
      <Box>
        {!isAuthenticated ? (
          <>
            <Button color="inherit" component={RouterLink} to="/login" sx={{ marginRight: '1rem' }}> {/* Add margin to the right */}
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register" sx={{ marginRight: '1rem' }}> {/* Add margin to the right */}
              Register
            </Button>
          </>
        ) : (
          <>
            <Typography color="inherit" sx={{ marginRight: '1rem' }}>
              Hi {username}
            </Typography>
            <Button color="inherit" onClick={logout} sx={{ marginRight: '1rem' }}>
              Logout
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;