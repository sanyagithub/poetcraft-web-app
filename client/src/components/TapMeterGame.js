"use client"

import { useState, useEffect, useRef } from "react"
import "./style/TapMeterGame.css"

// Replace the POEMS constant with this updated version that includes syllable breakdowns
const POEMS = [
    {
        title: "Sonnet 18",
        author: "William Shakespeare",
        text: "Shall I compare thee to a summer's day?",
        audioUrl: "/audio/sonnet18.mp3",
        // Timing for each syllable in ms from start
        beats: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
        // Split into syllables with stress pattern (1=stressed, 0=unstressed)
        syllables: [
            { text: "Shall", stress: 0 },
            { text: "I", stress: 1 },
            { text: "com", stress: 0 },
            { text: "pare", stress: 1 },
            { text: "thee", stress: 0 },
            { text: "to", stress: 1 },
            { text: "a", stress: 0 },
            { text: "sum", stress: 1 },
            { text: "mer's", stress: 0 },
            { text: "day?", stress: 1 },
        ],
    },
    {
        title: "Sonnet 116",
        author: "William Shakespeare",
        text: "Let me not to the marriage of true minds",
        audioUrl: "/audio/sonnet116.mp3",
        beats: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
        syllables: [
            { text: "Let", stress: 0 },
            { text: "me", stress: 1 },
            { text: "not", stress: 0 },
            { text: "to", stress: 1 },
            { text: "the", stress: 0 },
            { text: "mar", stress: 1 },
            { text: "riage", stress: 0 },
            { text: "of", stress: 1 },
            { text: "true", stress: 0 },
            { text: "minds", stress: 1 },
        ],
    },
]

const TapMeterGame = () => {
    const [currentPoemIndex, setCurrentPoemIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [score, setScore] = useState(0)
    const [maxScore, setMaxScore] = useState(0)
    const [feedback, setFeedback] = useState("")
    const [taps, setTaps] = useState([])
    const [progress, setProgress] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [countdown, setCountdown] = useState(null)
    const [highlightIndex, setHighlightIndex] = useState(-1)

    const audioRef = useRef(null)
    const startTimeRef = useRef(null)
    const timerRef = useRef(null)

    const currentPoem = POEMS[currentPoemIndex]

    // Initialize audio
    useEffect(() => {
        audioRef.current = new Audio()
        audioRef.current.preload = "auto"

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])

    // Handle game start
    const startGame = () => {
        setScore(0)
        setMaxScore(currentPoem.beats.length)
        setTaps([])
        setFeedback("Get ready...")
        setGameOver(false)
        setProgress(0)
        setHighlightIndex(-1)

        // Start countdown
        setCountdown(3)

        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(countdownInterval)
                    playAudio()
                    return null
                }
                return prev ? prev - 1 : null
            })
        }, 1000)
    }

    // Play audio and start tracking
    const playAudio = () => {
        if (!audioRef.current) return

        // For demo purposes, we'll simulate the audio
        // In a real app, you would use:
        // audioRef.current.src = currentPoem.audioUrl;
        // audioRef.current.play();

        setIsPlaying(true)
        startTimeRef.current = Date.now()
        setFeedback("Listen and tap!")

        // Clear any existing timers
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        // Simulate the beats for highlighting with clearer visual feedback
        currentPoem.beats.forEach((beatTime, index) => {
            setTimeout(() => {
                setHighlightIndex(index)

                // Play a subtle sound for the beat (in a real implementation)
                // This would be synchronized with the poem audio

                // Reset highlight after a short time to create a pulsing effect
                setTimeout(() => {
                    if (index === currentPoem.beats.length - 1) {
                        // Keep the last syllable highlighted a bit longer
                        setTimeout(() => setHighlightIndex(-1), 300)
                    } else {
                        setHighlightIndex(-1)
                    }
                }, 200)
            }, beatTime)
        })

        // End game after last beat + 2 seconds
        const gameLength = currentPoem.beats[currentPoem.beats.length - 1] + 2000

        // Update progress bar
        const progressInterval = setInterval(() => {
            if (startTimeRef.current) {
                const elapsed = Date.now() - startTimeRef.current
                setProgress(Math.min((elapsed / gameLength) * 100, 100))

                if (elapsed >= gameLength) {
                    clearInterval(progressInterval)
                }
            }
        }, 50)

        // End game
        setTimeout(() => {
            endGame()
            clearInterval(progressInterval)
        }, gameLength)
    }

    // End the game and calculate score
    const endGame = () => {
        setIsPlaying(false)
        setGameOver(true)

        if (audioRef.current) {
            audioRef.current.pause()
        }

        // Calculate final score based on tap timing
        if (startTimeRef.current && taps.length > 0) {
            let correctTaps = 0

            // Compare each tap time with expected beat times
            taps.forEach((tapTime) => {
                // Find closest beat
                const closestBeat = currentPoem.beats.reduce((closest, beat) => {
                    const currentDiff = Math.abs(tapTime - beat)
                    const closestDiff = Math.abs(closest - beat)
                    return currentDiff < closestDiff ? tapTime : closest
                }, 0)

                // If tap is within 300ms of a beat, count it as correct
                if (Math.abs(tapTime - closestBeat) <= 300) {
                    correctTaps++
                }
            })

            const finalScore = Math.min(correctTaps, currentPoem.beats.length)
            setScore(finalScore)

            // Set feedback based on score
            const percentage = (finalScore / currentPoem.beats.length) * 100
            if (percentage >= 90) {
                setFeedback("Perfect rhythm! You're a natural poet!")
            } else if (percentage >= 70) {
                setFeedback("Great job! You've got a good sense of meter!")
            } else if (percentage >= 50) {
                setFeedback("Not bad! Keep practicing your timing.")
            } else {
                setFeedback("Keep trying! Iambic pentameter takes practice.")
            }
        }
    }

    // Handle user tap
    const handleTap = () => {
        if (!isPlaying || gameOver) return

        // Vibrate on mobile devices if supported
        if (navigator.vibrate) {
            navigator.vibrate(20)
        }

        if (startTimeRef.current) {
            const tapTime = Date.now() - startTimeRef.current
            setTaps((prev) => [...prev, tapTime])

            // Find closest beat to this tap
            const closestBeat = currentPoem.beats.reduce((closest, beat) => {
                return Math.abs(tapTime - beat) < Math.abs(tapTime - closest) ? beat : closest
            }, currentPoem.beats[0])

            // Give immediate feedback
            const accuracy = Math.abs(tapTime - closestBeat)
            if (accuracy <= 150) {
                setFeedback("Perfect!")
            } else if (accuracy <= 300) {
                setFeedback("Good!")
            } else {
                setFeedback("Miss!")
            }
        }
    }

    // Change to next poem
    const nextPoem = () => {
        setCurrentPoemIndex((prev) => (prev + 1) % POEMS.length)
    }

    // Replace the renderPoemText function with this updated version
    const renderPoemText = () => {
        return (
            <div className="poem-text">
                {currentPoem.syllables.map((syllable, index) => (
                    <span
                        key={index}
                        className={`poem-syllable ${syllable.stress ? "stressed" : "unstressed"} ${highlightIndex === index ? "highlighted" : ""}`}
                    >
            {syllable.text}
          </span>
                ))}
            </div>
        )
    }

    // Add a visual beat indicator function to the component
    // Add this function before the return statement
    const renderBeatIndicator = () => {
        if (!isPlaying) return null

        return (
            <div className="beat-indicator">
                {currentPoem.syllables.map((syllable, index) => (
                    <div
                        key={index}
                        className={`beat-dot ${syllable.stress ? "stressed" : "unstressed"} ${highlightIndex === index ? "active" : ""}`}
                    ></div>
                ))}
            </div>
        )
    }

    return (
        <div className="about-section">
            <div className="about-content">
                <div className="decorative-element leaf-top"></div>
                <div className="decorative-element leaf-bottom"></div>
                <div className="decorative-element spiral-left"></div>
                <div className="decorative-element spiral-right"></div>

                <div className="game-card">
                    <div className="poem-info">
                        <h2>{currentPoem.title}</h2>
                        <p className="poem-author">by {currentPoem.author}</p>
                    </div>

                    {renderPoemText()}

                    <div className="progress-container">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                    {renderBeatIndicator()}

                    {countdown !== null && (
                        <div className="countdown-overlay">
                            <div className="countdown-number">{countdown}</div>
                        </div>
                    )}

                    <div className={`tap-area ${isPlaying ? "active" : ""}`} onClick={handleTap}>
                        {isPlaying ? (
                            <div className="feedback-text">{feedback}</div>
                        ) : (
                            <div className="tap-instructions">
                                <p>Tap here to the rhythm</p>
                                <p className="tap-subtitle">Can you keep time with this iambic pentameter line?</p>
                            </div>
                        )}
                    </div>

                    <div className="game-controls">
                        <div className="score-display">
                            {gameOver && (
                                <div>
                                    Score:{" "}
                                    <span className="score-value">
                    {score}/{maxScore}
                  </span>
                                </div>
                            )}
                        </div>

                        <div className="button-group">
                            {!isPlaying && (
                                <button className="next-poem-button" onClick={startGame} disabled={isPlaying}>
                                    {gameOver ? "Play Again" : "Start"}
                                </button>
                            )}

                            <button className="next-poem-button" onClick={nextPoem} disabled={isPlaying}>
                                Next Poem
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TapMeterGame
