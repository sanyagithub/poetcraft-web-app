import React from 'react';
import {Card, Typography, Avatar, Stack, Box, Grid, Switch} from '@mui/joy';

const Profile = () => (
    <Box sx={{ padding: 4, backgroundColor: '#F3EAFB' }}>
        <Grid container spacing={3} sx={{ maxWidth: 900, margin: '0 auto' }}>
            <Grid item xs={12} md={6}>
                <Card sx={{ padding: 3, boxShadow: 2, borderRadius: 2, backgroundColor: '#FFFFFF', textAlign: 'center' }}>
                    <Avatar src="/profile-pic.png" size="lg" sx={{ margin: '0 auto', marginBottom: 2 }} />
                    <Typography level="h2" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        Username
                    </Typography>
                    <Typography level="body2" sx={{ marginBottom: 2, color: '#666666' }}>
                        This is your bio. Share a bit about yourself with the community!
                    </Typography>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card sx={{ padding: 3, boxShadow: 2, borderRadius: 2, backgroundColor: '#FFFFFF' }}>
                    <Typography level="h2" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        Saved Feedback and Practice History
                    </Typography>
                    <Typography level="body2" sx={{ marginTop: 1, color: '#666666' }}>
                        Access your previously saved feedback and track your progress over time.
                    </Typography>
                </Card>
            </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ maxWidth: 700, margin: '0 auto' }}>
            <Grid item xs={12} md={6}>
                <Card sx={{ padding: 3, boxShadow: 2, borderRadius: 2, backgroundColor: '#FFFFFF' }}>
                    <Typography level="h2" sx={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 1 }}>
                        Privacy Controls
                    </Typography>
                    <Typography level="body2" sx={{ color: '#666666', marginBottom: 2 }}>
                        Manage who can see your profile and content.
                    </Typography>
                    <Stack spacing={2} sx={{ paddingLeft: 1 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography level="body1" sx={{ color: '#333' }}>Public</Typography>
                            <Switch />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography level="body1" sx={{ color: '#333' }}>Followers Only</Typography>
                            <Switch />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography level="body1" sx={{ color: '#333' }}>Private</Typography>
                            <Switch />
                        </Stack>
                    </Stack>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card sx={{ padding: 3, boxShadow: 2, borderRadius: 2, backgroundColor: '#FFFFFF' }}>
                    <Typography level="h2" sx={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 1 }}>
                        Notifications
                    </Typography>
                    <Typography level="body2" sx={{ color: '#666666', marginBottom: 2 }}>
                        Choose when to receive notifications about activity and progress.
                    </Typography>
                    <Stack spacing={2} sx={{ paddingLeft: 1 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography level="body1" sx={{ color: '#333' }}>New Feedback</Typography>
                            <Switch />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography level="body1" sx={{ color: '#333' }}>Community Activity</Typography>
                            <Switch />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography level="body1" sx={{ color: '#333' }}>Lesson Completion</Typography>
                            <Switch />
                        </Stack>
                    </Stack>
                </Card>
            </Grid>
        </Grid>
    </Box>

);

export default Profile;
