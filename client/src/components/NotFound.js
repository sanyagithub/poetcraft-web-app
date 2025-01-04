// components/NotFound.js
import React from 'react';
import { Typography, Box, Button } from '@mui/joy';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
        <Typography level="h2" sx={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 2 }}>
            404 - Page Not Found
        </Typography>
        <Typography level="body1" sx={{ marginBottom: 3 }}>
            Oops! The page you’re looking for doesn’t exist.
        </Typography>
        <Button component={Link} to="/" variant="solid" color="primary">
            Back to Home
        </Button>
    </Box>
);

export default NotFound;
