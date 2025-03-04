import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style/StressChecker.css';
import Muse from "./Muse";

function StressChecker() {
    const [word, setWord] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [retrying, setRetrying] = useState(false);

    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000; // 1 second delay between retries

    const fetchWordStress = async (retryCount = 0) => {
        try {
            const response = await axios.get(`https://api.poetcraft.org/api/stress-check/${encodeURIComponent(word.toLowerCase())}`);

            // Transform the data for display
            const syllableData = response.data.map(item => ({
                text: item.syllable,
                stressType: item.type
            }));

            setResult({
                syllables: syllableData,
                pattern: syllableData.map(s => {
                    switch(s.stressType) {
                        case 'primary': return '/';
                        case 'secondary': return '\\';
                        default: return 'u';
                    }
                }).join(' '),
                word: word
            });

            setRetrying(false);
            return true;
        } catch (err) {
            // Check if it's a network error and we haven't exceeded max retries
            if ((err.message === 'Network Error' || err.code === 'ECONNABORTED') && retryCount < MAX_RETRIES) {
                setRetrying(true);
                setError(`Network issue detected. Retrying... (${retryCount + 1}/${MAX_RETRIES})`);

                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));

                // Recursive retry with incremented counter
                return fetchWordStress(retryCount + 1);
            } else {
                // Either not a network error or we've exceeded max retries
                if (retryCount >= MAX_RETRIES) {
                    setError('Maximum retry attempts reached. Please check your connection and try again.');
                } else {
                    setError('Unable to analyze the word. Please try again.');
                }
                console.error('Error:', err);
                setRetrying(false);
                return false;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);
        setRetrying(false);

        try {
            await fetchWordStress();
        } finally {
            setLoading(false);
        }
    };

    const getStressMarker = (stressType) => {
        switch(stressType) {
            case 'primary': return '/';
            case 'secondary': return '\\';
            default: return 'u';
        }
    };

    const getStressClass = (stressType) => {
        switch(stressType) {
            case 'primary': return 'primary-stress';
            case 'secondary': return 'secondary-stress';
            default: return 'unstressed';
        }
    };

    const handleRetry = () => {
        setLoading(true);
        setError('');
        fetchWordStress().finally(() => setLoading(false));
    };

    const renderResults = () => {
        if (!result) return null;

        return (
            <div className="result-section">
                <h2>Results for "{result.word}"</h2>
                <div className="syllable-display">
                    {result.syllables.map((syllable, index) => (
                        <div
                            key={index}
                            className={`syllable ${getStressClass(syllable.stressType)}`}
                        >
                            <span className="syllable-text">{syllable.text}</span>
                            <span className="stress-marker">
                                {getStressMarker(syllable.stressType)}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="pattern-info">
                    <p>Total Syllables: {result.syllables.length}</p>
                    <p>Pattern: {result.pattern}</p>
                </div>
                <div className="stress-legend">
                    <h3>Stress Pattern Guide:</h3>
                    <ul>
                        <li><span className="legend-marker">/</span> Primary Stress</li>
                        <li><span className="legend-marker">\</span> Secondary Stress</li>
                        <li><span className="legend-marker">u</span> Unstressed</li>
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className="stress-checker-container">
            <div className="stress-checker-content">
                <header className="stress-checker-header">
                    <h1>Word Stress Pattern</h1>
                    <p className="subtitle">Enter a word to see its stressed and unstressed syllables</p>
                </header>

                <div className="muse-helper">
                    <Muse
                        type="reading"
                        message="Let me help you understand how this word flows in poetry!"
                    />
                </div>

                <form onSubmit={handleSubmit} className="stress-form">
                    <div className="input-group">
                        <label htmlFor="word">Enter a Word:</label>
                        <input
                            type="text"
                            id="word"
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            placeholder="Try words like 'poetry' or 'beautiful'"
                            className="word-input"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="check-button"
                        disabled={loading || !word.trim()}
                    >
                        {loading ? (retrying ? 'Retrying...' : 'Analyzing...') : 'Check Stress Pattern'}
                    </button>
                </form>

                {error && (
                    <div className="error-message">
                        {error}
                        {!retrying && error.includes('Maximum retry attempts') && (
                            <button
                                onClick={handleRetry}
                                className="retry-button"
                                disabled={loading}
                            >
                                Try Again
                            </button>
                        )}
                    </div>
                )}

                {renderResults()}

                <Link to="/" className="back-link">
                    ← Back to Lessons
                </Link>
            </div>
        </div>
    );
}

export default StressChecker;
