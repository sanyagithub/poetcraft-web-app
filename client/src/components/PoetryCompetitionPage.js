import React, { useEffect } from 'react';
import { Card, CardContent, Button, Divider, Typography, Box, Container, Grid, Stack } from '@mui/joy';
import { CheckCircle, EmojiEvents, AccessTime, Celebration, School } from '@mui/icons-material';

const PoetryCompetitionPage = () => {
    // This ensures the ThriveCart script is properly loaded and initialized
    useEffect(() => {
        // Create container div if it doesn't exist
        let container = document.getElementById('thrivecart-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'thrivecart-container';
            const mountPoint = document.getElementById('thrivecart-mount-point');
            if (mountPoint) {
                mountPoint.appendChild(container);
            }
        }

        // Clear any existing content
        if (container) {
            container.innerHTML = '';

            // Create the embeddable div
            const embeddableDiv = document.createElement('div');
            embeddableDiv.className = 'tc-v2-embeddable-target';
            embeddableDiv.setAttribute('data-thrivecart-account', 'anniefinch');
            embeddableDiv.setAttribute('data-thrivecart-tpl', 'v2');
            embeddableDiv.setAttribute('data-thrivecart-product', '11');
            embeddableDiv.setAttribute('data-thrivecart-embeddable', 'tc-anniefinch-11-IB6XE6');

            container.appendChild(embeddableDiv);
        }

        // Check if script already exists to avoid duplicates
        const existingScript = document.getElementById('tc-anniefinch-11-IB6XE6');
        if (!existingScript) {
            // Create and append the script
            const script = document.createElement('script');
            script.src = '//tinder.thrivecart.com/embed/v2/thrivecart.js';
            script.id = 'tc-anniefinch-11-IB6XE6';
            script.async = true;

            // Add error handling
            script.onerror = () => {
                console.error('ThriveCart script failed to load');
                const container = document.getElementById('thrivecart-container');
                if (container) {
                    container.innerHTML = `
                        <div style="padding: 20px; border: 1px solid #ccc; text-align: center;">
                            <p>Payment form temporarily unavailable.</p>
                            <p>Please contact support or try again later.</p>
                        </div>
                    `;
                }
            };

            document.body.appendChild(script);
        }

        // Cleanup function
        return () => {
            const script = document.getElementById('tc-anniefinch-11-IB6XE6');
            if (script) script.remove();
        };
    }, []);

    // Benefits data
    const benefits = [
        "Chance to win prizes worth $250",
        "Featured placement in our online showcase",
        "Opportunity for your poem to be a part of an anthology"
    ];

    // How it works data
    const howItWorks = [
        {
            step: "1. Submit Your Poems",
            description: "After payment, you'll receive a link to submit up to 3 of your best NaPoWriMo poems.",
            icon: <School />
        },
        {
            step: "2. Expert Review",
            description: "Our panel of published poets will review all entries and provide personalized feedback.",
            icon: <CheckCircle />
        },
        {
            step: "3. Winners & Showcase",
            description: "Winners will be announced on May 10th, and selected poems will be featured in our online showcase.",
            icon: <Celebration />
        }
    ];

    // FAQ data
    const faqs = [
        {
            question: "How many poems can I submit?",
            answer: "You can submit up to 3 poems with your entry fee of $20."
        },
        {
            question: "Does my poem need to follow a specific form?",
            answer: "No, all forms and styles are welcome. Free verse, sonnets, haiku, or any other form you prefer."
        },
        {
            question: "Will I receive feedback even if I don't win?",
            answer: "Yes! Every participant will receive personalized feedback on their submitted poems."
        },
        {
            question: "What are the prizes worth $250?",
            answer: "Prizes include gift cards, poetry books, publication opportunities, and access to select Poetcraft premium features."
        }
    ];

    return (
        <Container
            maxWidth={false}
            sx={{
                maxWidth: '1200px',
                py: 4,
                px: { xs: 2, sm: 3 }
            }}
        >
            {/* Header Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    mb: 4
                }}
            >
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'primary.100',
                        mb: 2
                    }}
                >
                    <EmojiEvents sx={{ width: 40, height: 40, color: 'primary.500' }}/>
                </Box>

                <Typography level="h1" sx={{ mb: 2, color: 'primary.600' }}>
                    NaPoWriMo Poetry Competition
                </Typography>

                <Typography
                    sx={{
                        maxWidth: 600,
                        mb: 2,
                        color: 'neutral.600'
                    }}
                >
                    Submit your best NaPoWriMo poems for a chance to win prizes worth $250 and receive professional
                    feedback on your work.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTime sx={{ color: 'primary.500', fontSize: 20 }} />
                        <Typography level="body-sm">Deadline: April 30, 2025</Typography>
                    </Box>

                    <Divider orientation="vertical" />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Celebration sx={{ color: 'primary.500', fontSize: 20 }} />
                        <Typography level="body-sm">Winners Announced: May 10, 2025</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Main Content and Sidebar */}
            <Grid container spacing={3}>
                {/* Main Content - ThriveCart Embed */}
                <Grid xs={12} md={8}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography level="h2" sx={{ mb: 2 }}>
                                Enter the Competition
                            </Typography>

                            <Divider sx={{ mb: 3 }} />

                            {/* ThriveCart Embed */}
                            <Box id="thrivecart-mount-point" sx={{ mb: 3 }}>
                                {/* ThriveCart will be mounted here by the useEffect */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        py: 6
                                    }}
                                >
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                height: 48,
                                                width: 48,
                                                borderRadius: '50%',
                                                bgcolor: 'primary.100',
                                                mb: 2,
                                                animation: 'pulse 1.5s infinite ease-in-out'
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                height: 16,
                                                width: 180,
                                                bgcolor: 'primary.100',
                                                borderRadius: 1,
                                                mb: 1.5,
                                                animation: 'pulse 1.5s infinite ease-in-out',
                                                '@keyframes pulse': {
                                                    '0%, 100%': { opacity: 0.6 },
                                                    '50%': { opacity: 0.3 }
                                                }
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                height: 12,
                                                width: 140,
                                                bgcolor: 'primary.50',
                                                borderRadius: 1,
                                                animation: 'pulse 1.5s infinite ease-in-out'
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>

                            {/* Fallback Button */}
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    p: 2,
                                    bgcolor: 'neutral.50',
                                    borderRadius: 2
                                }}
                            >
                                <Typography level="body-sm" sx={{ mb: 1.5, color: 'neutral.600' }}>
                                    If the payment form doesn't load, you can use the button below:
                                </Typography>
                                <Button
                                    variant="solid"
                                    color="primary"
                                    size="lg"
                                    component="a"
                                    href="https://anniefinch.thrivecart.com/poetcraft-napowrimo-competition-entry/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Enter the Poetry Competition - $20
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sidebar - Competition Benefits */}
                <Grid xs={12} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography level="h2" sx={{ mb: 2 }}>
                                Competition Benefits
                            </Typography>

                            <Divider sx={{ mb: 3 }} />

                            <Stack spacing={2}>
                                {benefits.map((benefit, index) => (
                                    <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                                        <CheckCircle
                                            sx={{
                                                color: 'success.500',
                                                flexShrink: 0,
                                                mt: 0.5,
                                                fontSize: 20
                                            }}
                                        />
                                        <Typography>{benefit}</Typography>
                                    </Box>
                                ))}
                            </Stack>

                            <Divider sx={{ my: 3 }} />

                            <Box
                                sx={{
                                    bgcolor: 'primary.50',
                                    p: 2,
                                    borderRadius: 2
                                }}
                            >
                                <Typography level="title-md" sx={{ mb: 1 }}>
                                    NaPoWriMo Special
                                </Typography>

                                <Typography level="body-sm" sx={{ mb: 2, color: 'neutral.600' }}>
                                    Submit your poems during National Poetry Writing Month and get an exclusive discount
                                    on our comprehensive Meter Writing Resources package!
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            level="h3"
                                            sx={{
                                                color: 'primary.600',
                                                display: 'inline'
                                            }}
                                        >
                                            $20
                                        </Typography>
                                        <Typography
                                            level="body-sm"
                                            sx={{
                                                ml: 1,
                                                color: 'neutral.600',
                                                display: 'inline'
                                            }}
                                        >
                                            entry fee
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            px: 1.5,
                                            py: 0.5,
                                            bgcolor: 'primary.100',
                                            color: 'primary.700',
                                            borderRadius: 10,
                                            fontSize: '0.75rem',
                                            fontWeight: 600
                                        }}
                                    >
                                        Limited Time
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* How It Works Section */}
            {/*<Card variant="outlined" sx={{ mt: 4 }}>*/}
            {/*    <CardContent sx={{ p: 3 }}>*/}
            {/*        <Typography level="h2" sx={{ mb: 2 }}>*/}
            {/*            How It Works*/}
            {/*        </Typography>*/}

            {/*        <Divider sx={{ mb: 3 }} />*/}

            {/*        <Grid container spacing={3}>*/}
            {/*            {howItWorks.map((item, index) => (*/}
            {/*                <Grid key={index} xs={12} md={4}>*/}
            {/*                    <Box*/}
            {/*                        sx={{*/}
            {/*                            p: 3,*/}
            {/*                            border: '1px solid',*/}
            {/*                            borderColor: 'neutral.200',*/}
            {/*                            borderRadius: 2,*/}
            {/*                            height: '100%',*/}
            {/*                            transition: 'all 0.2s ease-in-out',*/}
            {/*                            '&:hover': {*/}
            {/*                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',*/}
            {/*                                borderColor: 'primary.200'*/}
            {/*                            }*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        <Box*/}
            {/*                            sx={{*/}
            {/*                                display: 'flex',*/}
            {/*                                alignItems: 'center',*/}
            {/*                                gap: 1.5,*/}
            {/*                                mb: 2*/}
            {/*                            }}*/}
            {/*                        >*/}
            {/*                            <Box*/}
            {/*                                sx={{*/}
            {/*                                    bgcolor: 'primary.50',*/}
            {/*                                    p: 1,*/}
            {/*                                    borderRadius: '50%',*/}
            {/*                                    display: 'flex'*/}
            {/*                                }}*/}
            {/*                            >*/}
            {/*                                {React.cloneElement(item.icon, {*/}
            {/*                                    sx: { color: 'primary.500', fontSize: 24 }*/}
            {/*                                })}*/}
            {/*                            </Box>*/}
            {/*                            <Typography*/}
            {/*                                level="title-lg"*/}
            {/*                                sx={{*/}
            {/*                                    color: 'primary.600',*/}
            {/*                                    fontWeight: 600*/}
            {/*                                }}*/}
            {/*                            >*/}
            {/*                                {item.step}*/}
            {/*                            </Typography>*/}
            {/*                        </Box>*/}
            {/*                        <Typography sx={{ color: 'neutral.600' }}>*/}
            {/*                            {item.description}*/}
            {/*                        </Typography>*/}
            {/*                    </Box>*/}
            {/*                </Grid>*/}
            {/*            ))}*/}
            {/*        </Grid>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}

            {/* FAQ Section */}
            {/*<Card variant="outlined" sx={{ mt: 4 }}>*/}
            {/*    <CardContent sx={{ p: 3 }}>*/}
            {/*        <Typography level="h2" sx={{ mb: 2 }}>*/}
            {/*            Frequently Asked Questions*/}
            {/*        </Typography>*/}

            {/*        <Divider sx={{ mb: 3 }} />*/}

            {/*        <Grid container spacing={3}>*/}
            {/*            {faqs.map((faq, index) => (*/}
            {/*                <Grid key={index} xs={12} md={6}>*/}
            {/*                    <Box sx={{ mb: 2 }}>*/}
            {/*                        <Typography*/}
            {/*                            level="title-md"*/}
            {/*                            sx={{*/}
            {/*                                mb: 1,*/}
            {/*                                color: 'primary.700'*/}
            {/*                            }}*/}
            {/*                        >*/}
            {/*                            {faq.question}*/}
            {/*                        </Typography>*/}
            {/*                        <Typography sx={{ color: 'neutral.600' }}>*/}
            {/*                            {faq.answer}*/}
            {/*                        </Typography>*/}
            {/*                    </Box>*/}
            {/*                </Grid>*/}
            {/*            ))}*/}
            {/*        </Grid>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}

            {/* Meter Writing Resources */}
            {/*<Card variant="outlined" sx={{ mt: 4 }}>*/}
            {/*    <CardContent sx={{ p: 3 }}>*/}
            {/*        <Typography level="h2" sx={{ mb: 2 }}>*/}
            {/*            Your Path to Mastering Metrical Writing*/}
            {/*        </Typography>*/}

            {/*        <Divider sx={{ mb: 3 }} />*/}

            {/*        <Typography sx={{ mb: 3 }}>*/}
            {/*            This competition is just the beginning of your journey into the art of metrical poetry.*/}
            {/*            After the competition, take your writing to the next level with our comprehensive Meter*/}
            {/*            Writing Resources package.*/}
            {/*        </Typography>*/}

            {/*        <Box*/}
            {/*            sx={{*/}
            {/*                bgcolor: 'primary.50',*/}
            {/*                p: 3,*/}
            {/*                borderRadius: 2*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <Typography level="title-md" sx={{ mb: 1.5 }}>*/}
            {/*                Exclusive Offer for Competition Participants*/}
            {/*            </Typography>*/}

            {/*            <Typography level="body-sm" sx={{ mb: 2, color: 'neutral.600' }}>*/}
            {/*                Competition participants will receive a special discount code for our $99 Meter Writing*/}
            {/*                Resources package, which includes:*/}
            {/*            </Typography>*/}

            {/*            <Stack spacing={1.5}>*/}
            {/*                {[*/}
            {/*                    "Annie Finch's recorded lessons on scanning and writing in meter",*/}
            {/*                    "Weekly generative writing circles",*/}
            {/*                    "Access to our AI scansion tool"*/}
            {/*                ].map((item, index) => (*/}
            {/*                    <Box key={index} sx={{ display: 'flex', gap: 1.5 }}>*/}
            {/*                        <CheckCircle*/}
            {/*                            sx={{*/}
            {/*                                color: 'success.500',*/}
            {/*                                flexShrink: 0,*/}
            {/*                                fontSize: 18*/}
            {/*                            }}*/}
            {/*                        />*/}
            {/*                        <Typography level="body-sm">{item}</Typography>*/}
            {/*                    </Box>*/}
            {/*                ))}*/}
            {/*            </Stack>*/}
            {/*        </Box>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}
        </Container>
    );
};

export default PoetryCompetitionPage;
