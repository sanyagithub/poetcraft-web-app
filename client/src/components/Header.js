import React from 'react';
import { Button, Stack, Typography, Box } from '@mui/joy';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    return (
        <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
            sx={{ padding: '1.5rem 2rem', borderBottom: '1px solid #ddd', backgroundColor: '#F3EAFB' }}
        >
            {/* Logo and Tagline */}
            <Stack direction="row" alignItems="center" spacing={1}>
                <img src="/client/src/assets/muse-writing.png" alt="PoetCraft Logo" style={{ height: '40px' }} />
                <Box>
                    <Typography level="h6" sx={{ fontWeight: 'bold', color: '#9C6ADE', fontSize: '1.25rem' }}>
                        PoetCraft
                    </Typography>
                    <Typography level="body2" sx={{ fontStyle: 'italic', color: '#5E3A2B', fontSize: '0.9rem' }}>
                        Designed with the expertise of Annie Finch
                    </Typography>
                </Box>
            </Stack>

            {/* Navigation Links */}
            <Stack direction="row" spacing={2}>
                <Button
                    component={Link}
                    to="/"
                    variant="plain"
                    sx={{
                        color: location.pathname === '/' ? '#9C6ADE' : '#333',
                        fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                        textDecoration: location.pathname === '/' ? 'underline' : 'none',
                        '&:hover': { color: '#9C6ADE' }
                    }}
                >
                    Home
                </Button>
                {/*<Button*/}
                {/*    component={Link}*/}
                {/*    to="/learning"*/}
                {/*    variant="plain"*/}
                {/*    sx={{ color: location.pathname === '/learning' ? '#9C6ADE' : '#333', fontWeight: location.pathname === '/learning' ? 'bold' : 'normal', '&:hover': { color: '#9C6ADE' } }}*/}
                {/*>*/}
                {/*    Learning*/}
                {/*</Button>*/}
                {/*<Button*/}
                {/*    component={Link}*/}
                {/*    to="/community"*/}
                {/*    variant="plain"*/}
                {/*    sx={{ color: location.pathname === '/community' ? '#9C6ADE' : '#333', fontWeight: location.pathname === '/community' ? 'bold' : 'normal', '&:hover': { color: '#9C6ADE' } }}*/}
                {/*>*/}
                {/*    Community*/}
                {/*</Button>*/}
                <Button
                    component={Link}
                    to="/profile"
                    variant="plain"
                    sx={{ color: location.pathname === '/profile' ? '#9C6ADE' : '#333', fontWeight: location.pathname === '/profile' ? 'bold' : 'normal', '&:hover': { color: '#9C6ADE' } }}
                >
                    Profile
                </Button>
                <Button
                    component={Link}
                    to="/lexicalstress"
                    variant="plain"
                    sx={{ color: location.pathname === '/lexicalstress' ? '#9C6ADE' : '#333', fontWeight: location.pathname === '/lexicalstress' ? 'bold' : 'normal', '&:hover': { color: '#9C6ADE' } }}
                >
                    Lexical Stress
                </Button>
                {/*<Button*/}
                {/*    component={Link}*/}
                {/*    to="/settings"*/}
                {/*    variant="plain"*/}
                {/*    sx={{ color: location.pathname === '/settings' ? '#9C6ADE' : '#333', fontWeight: location.pathname === '/settings' ? 'bold' : 'normal', '&:hover': { color: '#9C6ADE' } }}*/}
                {/*>*/}
                {/*    Settings*/}
                {/*</Button>*/}
            </Stack>
        </Stack>
    );
};

export default Header;
