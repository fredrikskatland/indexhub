import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'primary.dark',
        color: 'common.white',
        py: 2,
        mt: 'auto', // Push the footer to the bottom
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" component="div">
        IndexHub
      </Typography>
    </Box>
  );

  export default Footer;