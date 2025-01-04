import React from 'react';
import {Button, Card, Typography, List, ListItem, Stack, Box, Grid} from '@mui/joy';

const Learning = () => (
    <Box sx={{ padding: 4, backgroundColor: '#F3EAFB' }}>
        <Grid container spacing={3} sx={{ maxWidth: 900, margin: '0 auto' }}>
            <Grid item xs={12} md={6}>
                <Card sx={{ padding: 3, boxShadow: 2, borderRadius: 2, backgroundColor: '#FFFFFF' }}>
                    <Typography level="h2" sx={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                        Video Lessons
                    </Typography>
                    <Typography level="body2" sx={{ marginBottom: 2, color: '#666666' }}>
                        Watch engaging video lessons to deepen your understanding of poetry and rhythm.
                    </Typography>
                    <Button variant="solid" sx={{ backgroundColor: '#9C6ADE', maxWidth: 200 }}>
                        Play Video
                    </Button>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card sx={{ padding: 3, boxShadow: 2, borderRadius: 2, backgroundColor: '#FFFFFF' }}>
                    <Typography level="h2" sx={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                        Practice Prompts
                    </Typography>
                    <Typography level="body2" sx={{ marginBottom: 2, color: '#666666' }}>
                        Test your skills with prompts designed to challenge and inspire your creativity.
                    </Typography>
                    <Button variant="solid" sx={{ backgroundColor: '#FFABAB', maxWidth: 200 }}>
                        Submit for Feedback
                    </Button>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ padding: 3, boxShadow: 2, borderRadius: 2, backgroundColor: '#FFFFFF' }}>
                    <Typography level="h2" sx={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                        Self-Assessment Checklist
                    </Typography>
                    <List sx={{ paddingLeft: 2 }}>
                        <ListItem>✅ Check for consistent syllable count</ListItem>
                        <ListItem>✅ Ensure rhythm matches selected meter</ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    </Box>
);

export default Learning;
