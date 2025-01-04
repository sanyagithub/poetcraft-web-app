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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await axios.get(`https://poetcraft.org/api/stress-check/${encodeURIComponent(word)}`);

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
        } catch (err) {
            setError('Unable to analyze the word. Please try again.');
            console.error('Error:', err);
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
                        {loading ? 'Analyzing...' : 'Check Stress Pattern'}
                    </button>
                </form>

                {error && (
                    <div className="error-message">
                        {error}
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
