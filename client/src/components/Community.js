import React from 'react';
import {Button, Card, Textarea, Typography, Stack, Box, Grid} from '@mui/joy';

const Community = () => (
    <Box sx={{ padding: 4, backgroundColor: '#F3EAFB' }}>
        <Grid container spacing={3} sx={{ maxWidth: 900, margin: '0 auto' }}>
            <Grid item xs={12} md={6}>
                <Card sx={{ padding: 3, boxShadow: 2, borderRadius: 2, backgroundColor: '#FFFFFF' }}>
                    <Typography level="h2" sx={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                        Explore Community Poems
                    </Typography>
                    <Typography level="body2" sx={{ marginBottom: 2, color: '#666666' }}>
                        Share your thoughts on poems shared by other members.
                    </Typography>
                    <Textarea placeholder="Write your feedback here..." minRows={3} sx={{ width: '100%', marginBottom: 2 }} />
                    <Button variant="solid" sx={{ backgroundColor: '#9C6ADE', maxWidth: 200 }}>
                        Submit Feedback
                    </Button>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card sx={{ padding: 3, boxShadow: 2, borderRadius: 2, backgroundColor: '#FFFFFF' }}>
                    <Typography level="h2" sx={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                        Upload and Request Feedback
                    </Typography>
                    <Typography level="body2" sx={{ marginBottom: 2, color: '#666666' }}>
                        Upload your own poem and request feedback from the community.
                    </Typography>
                    <Button variant="solid" sx={{ backgroundColor: '#FFABAB', maxWidth: 200 }}>
                        Upload Poem
                    </Button>
                </Card>
            </Grid>
        </Grid>
    </Box>
);

export default Community;
