import React, { useState } from 'react';
import { Box, Typography, Input, Button, CircularProgress, Alert, Card, CardContent, Stack } from '@mui/joy';
import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

const LexicalStress = () => {
    const [word, setWord] = useState('');
    const [syllables, setSyllables] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleButtonState = () => {
        if (word.trim() === '') {
            setError('Please enter a word to analyze.');
            return;
        }

        setIsLoading(true);
        setError('');

        axios
            .get(`${API_BASE_URL}/api/auth/word/${word.toLowerCase()}`)
            .then(response => {
                setSyllables(response.data);
                setError('');
                setIsLoading(false);
            })
            .catch(error => {
                const errorMessage = error.response && error.response.status === 404
                    ? 'Word not found'
                    : 'An error occurred. Please try again later.';
                setError(errorMessage);
                setIsLoading(false);
            });
    };

    const renderSyllable = (syllable) => {
        const stressedStyle = syllable.type === 'stress'
            ? styles.stressedSyllableText
            : syllable.type === 'secondary stress'
                ? styles.secondaryStressSyllableText
                : styles.unstressedSyllableText;

        const isStressed = syllable.type === 'stress'
            ? '( / ) is stressed'
            : syllable.type === 'secondary stress'
                ? '( \\ ) is secondary stressed'
                : '( u ) is unstressed';

        return (
            <Card variant="outlined" sx={styles.syllableContainer} key={syllable.syllable}>
                <CardContent>
                    <Typography variant="body1" sx={stressedStyle}>
                        {syllable.syllable} - {isStressed}
                    </Typography>
                </CardContent>
            </Card>
        );
    };

    return (
        <Box sx={styles.container}>
            <Typography level="h4" align="center" sx={styles.header}>
                Explore Word Stress Patterns
            </Typography>

            <Input
                placeholder="Type a word to analyze stress patterns..."
                variant="outlined"
                color="primary"
                sx={styles.input}
                onChange={(e) => setWord(e.target.value)}
                value={word}
                aria-label="Enter word to analyze stress patterns"
            />

            {error && (
                <Alert color="danger" variant="soft" sx={{ mt: 2, mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Button
                variant="solid"
                color="primary"
                sx={styles.button}
                onClick={toggleButtonState}
                aria-label="Analyze word stress patterns"
            >
                {isLoading ? "Analyzing..." : "Analyze Stress"}
            </Button>

            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} aria-live="polite">
                    <CircularProgress size="lg" color="primary" />
                </Box>
            )}

            <Stack spacing={2} sx={{ mt: 3 }}>
                {syllables.map(renderSyllable)}
            </Stack>
        </Box>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        marginTop: '40px',
    },
    header: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: '1.8rem',
        mb: 3,
    },
    input: {
        width: '100%',
        mb: 2,
        backgroundColor: 'white',
        borderRadius: '8px',
        fontSize: '1rem',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#cccccc',
            },
            '&:hover fieldset': {
                borderColor: '#B08BC2',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#4B0082',
            },
        },
    },
    button: {
        width: '100%',
        backgroundColor: '#9C6ADE',
        // ':hover': {
        //     backgroundColor: '#3A006B',
        // },
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        mt: 2,
        py: 1.5,
        fontSize: '1rem',
    },
    syllableContainer: {
        backgroundColor: '#FAFAFA',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        p: 2,
        borderColor: '#B08BC2',
    },
    stressedSyllableText: {
        color: '#4B0082',
        fontWeight: 'bold',
        fontSize: '1.1rem',
    },
    unstressedSyllableText: {
        color: '#666',
        fontWeight: '400',
        fontSize: '1rem',
    },
    secondaryStressSyllableText: {
        color: '#9AAB63',
        fontWeight: '600',
        fontSize: '1rem',
    },
};

export default LexicalStress;
