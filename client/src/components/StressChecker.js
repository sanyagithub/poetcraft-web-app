import {useEffect, useState} from "react"
import axios from "axios"
import {Link, useLocation} from "react-router-dom"
import "./style/StressChecker.css"

function StressChecker() {
    const [word, setWord] = useState("")
    const [pronunciations, setPronunciations] = useState([])
    const [selectedPronunciation, setSelectedPronunciation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [retrying, setRetrying] = useState(false)

    const MAX_RETRIES = 3
    const RETRY_DELAY = 1000 // 1 second delay between retries

    const location = useLocation();

    useEffect(() => {
        if (!window.gtag) return;

        window.gtag("config", "G-B118D7BLD5", {
            page_path: location.pathname + location.search,
        });
    }, [location]);

    const fetchWordStress = async (retryCount = 0) => {
        try {
            const response = await axios.get(
                `https://api.poetcraft.org/api/stress-check/${encodeURIComponent(word.toLowerCase().trim())}`,
            )

            console.log(response.data);
            // Store all pronunciations
            setPronunciations(response.data)

            // Select the first pronunciation by default
            if (response.data.length > 0) {
                setSelectedPronunciation(response.data[0])
            }

            setRetrying(false)
            return true
        } catch (err) {
            // Check if it's a network error and we haven't exceeded max retries
            if ((err.message === "Network Error" || err.code === "ECONNABORTED") && retryCount < MAX_RETRIES) {
                setRetrying(true)
                setError(`Network issue detected. Retrying... (${retryCount + 1}/${MAX_RETRIES})`)

                // Wait before retrying
                await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))

                // Recursive retry with incremented counter
                return fetchWordStress(retryCount + 1)
            } else {
                // Either not a network error or we've exceeded max retries
                if (retryCount >= MAX_RETRIES) {
                    setError("Maximum retry attempts reached. Please check your connection and try again.")
                } else {
                    setError("Unable to analyze the word. Please try again.")
                }
                console.error("Error:", err)
                setRetrying(false)
                return false
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setPronunciations([])
        setSelectedPronunciation(null)
        setRetrying(false)

        try {
            await fetchWordStress()
        } finally {
            setLoading(false)
        }
    }

    const handlePronunciationSelect = (pronunciation) => {
        setSelectedPronunciation(pronunciation)
    }

    const getStressMarker = (stressType) => {
        switch (stressType) {
            case "primary":
                return "/"
            case "secondary":
                return "\\"
            default:
                return "u"
        }
    }

    const getStressClass = (stressType) => {
        switch (stressType) {
            case "primary":
                return "primary-stress"
            case "secondary":
                return "secondary-stress"
            default:
                return "unstressed"
        }
    }

    const handleRetry = () => {
        setLoading(true)
        setError("")
        fetchWordStress().finally(() => setLoading(false))
    }

    const getStressPattern = (syllables) => {
        return syllables.map((s) => getStressMarker(s.type)).join(" ")
    }

    const renderPronunciationOptions = () => {
        if (pronunciations.length <= 1) return null

        return (
            <div className="pronunciation-options">
                <h3>Multiple Stress Patterns are possible:</h3>
                <div className="pronunciation-buttons">
                    {pronunciations.map((pron, index) => (
                        <button
                            key={pron.id}
                            className={`pronunciation-button ${selectedPronunciation && selectedPronunciation.id === pron.id ? "selected" : ""}`}
                            onClick={() => handlePronunciationSelect(pron)}
                        >
                            Pattern {pron.id}
                            <span className="pattern-preview">{getStressPattern(pron.syllables)}</span>
                        </button>
                    ))}
                </div>
                {/*<div className="phoneme-reference">*/}
                {/*    <details>*/}
                {/*        <summary>Show phonetic details</summary>*/}
                {/*        <div className="phoneme-list">*/}
                {/*            {pronunciations.map((pron) => (*/}
                {/*                <div key={pron.id} className="phoneme-item">*/}
                {/*                    <span className="phoneme-label">Pattern {pron.id}:</span>*/}
                {/*                    <span className="phoneme-value">*/}
                {/*    {pron.rawPhonemes.map((phonemeSet, idx) => (*/}
                {/*        <span key={idx}>*/}
                {/*        {idx > 0 && " | "}*/}
                {/*            {phonemeSet.join(" ")}*/}
                {/*      </span>*/}
                {/*    ))}*/}
                {/*  </span>{pron.count > 1 && <span className="phoneme-count">({pron.count} variants)</span>}*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    </details>*/}
                {/*</div>*/}
                {/*<div className="phoneme-reference">*/}
                {/*    <details>*/}
                {/*        <summary>Show phonetic details</summary>*/}
                {/*        <div className="phoneme-list">*/}
                {/*            {pronunciations.map((pron) => (*/}
                {/*                <div key={pron.id} className="phoneme-item">*/}
                {/*                    <span className="phoneme-label">Pronunciation {pron.id}:</span>*/}
                {/*                    <span className="phoneme-value">{pron.rawPhonemes.join(" ")}</span>*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    </details>*/}
                {/*</div>*/}
            </div>
        )
    }

    const renderResults = () => {
        if (!selectedPronunciation) return null

        return (
            <div className="result-section">
                <h2>Results for "{word}"</h2>

                {renderPronunciationOptions()}

                <div className="syllable-display">
                    {selectedPronunciation.syllables.map((syllable, index) => (
                        <div key={index} className={`syllable ${getStressClass(syllable.type)}`}>
                            <span className="syllable-text">{syllable.syllable}</span>
                            <span className="stress-marker">{getStressMarker(syllable.type)}</span>
                        </div>
                    ))}
                </div>
                <div className="pattern-info">
                    <p>Total Syllables: {selectedPronunciation.syllables.length}</p>
                    <p>Pattern: {getStressPattern(selectedPronunciation.syllables)}</p>
                </div>
                <div className="stress-legend">
                    <h3>Stress Pattern Guide:</h3>
                    <ul>
                        <li>
                            <span className="legend-marker">/</span> Primary Stress
                        </li>
                        <li>
                            <span className="legend-marker">\</span> Secondary Stress
                        </li>
                        <li>
                            <span className="legend-marker">u</span> Unstressed
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className="stress-checker-container">
            <div className="stress-checker-content">
                <header className="stress-checker-header">
                    <h1>Word Stress Pattern</h1>
                    <p className="subtitle">Enter a word to see its stressed and unstressed syllables</p>
                </header>

                {/*<div className="muse-helper">*/}
                {/*    <Muse type="reading" message="Let me help you understand how this word flows in poetry!" />*/}
                {/*</div>*/}

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
                    <button type="submit" className="check-button" disabled={loading || !word.trim()}>
                        {loading ? (retrying ? "Retrying..." : "Analyzing...") : "Check Stress Pattern"}
                    </button>
                </form>

                {error && (
                    <div className="error-message">
                        {error}
                        {!retrying && error.includes("Maximum retry attempts") && (
                            <button onClick={handleRetry} className="retry-button" disabled={loading}>
                                Try Again
                            </button>
                        )}
                    </div>
                )}

                {renderResults()}

                <Link to="/moduleslist" className="back-link">
                    ← Back to Lessons
                </Link>
            </div>
        </div>
    )
}

export default StressChecker

