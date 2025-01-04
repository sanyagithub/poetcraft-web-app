// components/Layout.js
import React from 'react';
import { Box } from '@mui/joy';

const Layout = ({ children }) => (
    <Box sx={{ padding: 4, backgroundColor: '#F3EAFB', minHeight: '100vh' }}>
        {children}
    </Box>
);

export default Layout;
