"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../authContext"
import PoetcraftPromo from "./PoetcraftPromo"
import "./style/VideoModule.css"

// Define the module data for each type
const moduleData = {
    video: {
        type: "video",
        title: "Video Module",
        theme: "red",
        videoSources: {
            1: "/videos/scansion/video1.mp4",
            2: "/videos/scansion/video2.mp4",
            3: "/videos/scansion/video3.mp4",
            4: "/videos/scansion/video4.mp4",
            5: "/videos/scansion/video5.mp4",
            6: "/videos/scansion/video6.mp4",
            7: "/videos/scansion/video7.mp4",
            8: "/videos/scansion/video8.mp4",
            9: "/videos/scansion/video9.mp4",
            10: "/videos/scansion/video10.mp4",
            11: "/videos/scansion/video11.mp4",
        },
        questions: {
            1: "What is a poem to you?",
            2: "How many heartbeats do you feel each time you breathe in or out?",
            3: "What do you think are beats?",
            4: "What is the next syllable that gets a beat?",
            5: "What symbols do we use to mark the stronger syllables?",
            6: "Write down the syllables with the strong accents below..",
            7: "How are these syllables you marked different from the other syllables?",
            8: "What are the 3 things that make stressed syllables different from the unstressed syllables?",
            9: "What are the syllables that get a cup?",
            10: "Where will we mark the next edge?",
            11: "What was the final pattern in the poem?",
        },
        lectureSheets: [
            {
                title: "Basic Definitions",
                pdf: "/lecture-sheets/Meter-Basic-Definitions.pdf",
            },
            {
                title: "Poems discussed in the lecture",
                pdf: "/lecture-sheets/METER-OF-FIRE.pdf",
            },
        ],
    },
    iambic: {
        type: "iambic",
        title: "Iambic Meter",
        theme: "yellow",
        videoSources: {
            1: "/videos/iambic-meter/Introduction-to-Meter-of-Air-1.mp4",
            2: "/videos/iambic-meter/Revision-of-Process-of-Scansion-2.mp4",
            3: "/videos/iambic-meter/Significance-of-Variations-In-Meter-3.mp4",
            4: "/videos/iambic-meter/Ghost-Cups-4.mp4",
            5: "/videos/iambic-meter/The-Metrical-Contract-5.mp4",
            6: "/videos/iambic-meter/Origin-of-the-word-'meter'-6.mp4",
            7: "/videos/iambic-meter/Importance-of-Diversity-in-Meter-7.mp4",
            8: "/videos/iambic-meter/When-did-Iambic-become-predominant-in-English-8.mp4",
        },
        questions: {
            1: "Introduction to Meter of Air",
            2: "Revision of Process of Scansion",
            3: "Significance of Variations In Meter",
            4: "Ghost Cups",
            5: "The Metrical Contract",
            6: "Origin of the word 'meter'",
            7: "Importance of Diversity in Meter",
            8: "When did Iambic become predominant in English",
        },
        lectureSheets: [
            {
                title: "Basic Definitions",
                pdf: "/lecture-sheets/Meter-Basic-Definitions.pdf",
            },
            {
                title: "Poems discussed in the lecture",
                pdf: "/lecture-sheets/METER-OF-AIR.pdf",
            },
        ],
    },
    anapestic: {
        type: "anapestic",
        title: "Anapestic Meter",
        theme: "red",
        videoSources: {
            1: "/videos/anapestic-meter/Introduction-to-Meter-of-Fire-1.mp4",
            2: "/videos/anapestic-meter/I-would-live-in-your-love-2.mp4",
            3: "/videos/anapestic-meter/The-Destruction-of-Sennacherib-3.mp4",
            4: "/videos/anapestic-meter/Writing-in-anapestic-meter-4.mp4",
            5: "/videos/anapestic-meter/Fixing-Meter-In-Poems-5.mp4",
        },
        questions: {
            1: "Introduction to Meter of Fire",
            2: "I would live in your love",
            3: "The Destruction of Sennacherib",
            4: "Writing in anapestic meter",
            5: "Fixing Meter In Poems",
        },
        lectureSheets: [
            {
                title: "Basic Definitions",
                pdf: "/lecture-sheets/Meter-Basic-Definitions.pdf",
            },
            {
                title: "Poems discussed in the lecture",
                pdf: "/lecture-sheets/METER-OF-FIRE.pdf",
            },
        ],
    },
    trochaic: {
        type: "trochaic",
        title: "Trochaic Meter",
        theme: "green",
        videoSources: {
            1: "/videos/trochaic-meter/Revision-of-Definitions-1.mp4",
            2: "/videos/trochaic-meter/Revision-of-Scansion-2.mp4",
            3: "/videos/trochaic-meter/Variations-in-Trochee-Meter-3.mp4",
            4: "/videos/trochaic-meter/The-Language-of-Meter-4.mp4",
            5: "/videos/trochaic-meter/Reading-some-poems-in-Trochee-Meter-5.mp4",
            6: "/videos/trochaic-meter/Why-did-poets-choose-trochee-meter-Part-1-6.mp4",
            7: "/videos/trochaic-meter/Why-did-poets-choose-trochee-meter-Part-2-7.mp4",
            8: "/videos/trochaic-meter/Power-of-Metrical-Diversity-8.mp4",
            9: "/videos/trochaic-meter/A-Poet's-Craft-9.mp4",
        },
        questions: {
            1: "Revision of Definitions",
            2: "Revision of Scansion",
            3: "Variations in Trochee Meter",
            4: "The Language of Meter",
            5: "Reading some poems in Trochee Meter",
            6: "Why did poets choose trochee meter Part 1",
            7: "Why did poets choose trochee meter Part 2",
            8: "Power of Metrical Diversity",
            9: "A Poet's Craft",
        },
        lectureSheets: [
            {
                title: "Basic Definitions",
                pdf: "/lecture-sheets/Meter-Basic-Definitions.pdf",
            },
            {
                title: "Poems discussed in the lecture",
                pdf: "/lecture-sheets/METER-OF-EARTH.pdf",
            },
        ],
    },
    dactylic: {
        type: "dactylic",
        title: "Dactylic Meter",
        theme: "blue",
        videoSources: {
            1: "/videos/dactylic-meter/Revision-of-Meter-Definitions-and-Scansion-1.mp4",
            2: "/videos/dactylic-meter/Scanning-a-Poem-in-Dactylic-Meter-Part-1-2.mp4",
            3: "/videos/dactylic-meter/Levels-of-Stress-3.mp4",
            4: "/videos/dactylic-meter/Scanning-a-Poem-in-Dactylic-Meter-2-4.mp4",
            5: "/videos/dactylic-meter/Meter-of-Heart-5.mp4",
            6: "/videos/dactylic-meter/Scanning-a-Poem-in-Dactylic-Meter-3-6.mp4",
            7: "/videos/dactylic-meter/Reading-a-Poem-in-Dactylic-Meter-7.mp4",
            8: "/videos/dactylic-meter/Scan-another-line-together-8.mp4",
            9: "/videos/dactylic-meter/Healing-using-Meter-Part-1-9.mp4",
            10: "/videos/dactylic-meter/Healing-using-Meter-Part-2-10.mp4",
        },
        questions: {
            1: "Revision of Meter Definitions and Scansion",
            2: "Scanning a Poem in Dactylic Meter Part 1",
            3: "Levels of Stress",
            4: "Scanning a Poem in Dactylic Meter Part 2",
            5: "Reading some poems in Dactylic Meter",
            6: "Meter of Heart",
            7: "Scanning a Poem in Dactylic Meter Part 3",
            8: "Reading a Poem in Dactylic Meter",
            9: "Scan another line together",
            10: "Healing using Meter Part 1",
            11: "Healing using Meter Part 2",
        },
        lectureSheets: [
            {
                title: "Basic Definitions",
                pdf: "/lecture-sheets/Meter-Basic-Definitions.pdf",
            },
            {
                title: "Poems discussed in the lecture",
                pdf: "/lecture-sheets/METER-OF-WATER.pdf",
            },
        ],
    },
}

function MeterModule({ moduleType }) {
    const data = moduleData[moduleType]
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const [selectedModule, setSelectedModule] = useState(1)
    const [videoError, setVideoError] = useState(false)
    const [showSignupPrompt, setShowSignupPrompt] = useState(false)
    const [showLectureSheets, setShowLectureSheets] = useState(false)
    const [fade, setFade] = useState(false) // to trigger fade-out/fade-in effect

    // Handle module change with a poetic fade transition
    const handleModuleChange = (moduleNumber) => {
        if (moduleNumber < 1 || moduleNumber > Object.keys(data.videoSources).length) return

        // Check if user is trying to access videos beyond the first one
        if (moduleNumber > 1 && !isAuthenticated) {
            // Redirect to login page
            navigate("/login")
            return
        }

        setFade(true)
        setTimeout(() => {
            setSelectedModule(moduleNumber)
            setFade(false)
        }, 300) // duration for fade-out before switching
    }

    const handleContinueClick = () => {
        // Check if user is trying to access videos beyond the first one
        if (selectedModule === 1 && !isAuthenticated) {
            // Redirect to login page
            navigate("/login")
            return
        }

        handleModuleChange(selectedModule + 1)
    }

    const toggleLectureSheets = () => {
        setShowLectureSheets((prev) => !prev)
    }

    const progressPercentage = (selectedModule / Object.keys(data.videoSources).length) * 100

    return (
        <div className={`module-container theme-${data.theme}`} role="main">
            <div className="module-sidebar" role="navigation">
                <div className="welcome-section-video">
                    <h2>Your Poetry Journey Begins Here</h2>
                    <p className="welcome-text">
                        Discover the hidden structures that have powered poetry for centuries, with gentle guidance from Annie
                        Finch.
                    </p>
                </div>

                <div className="module-list">
                    {Object.keys(data.videoSources).map((module) => (
                        <button
                            key={module}
                            className={`module-button ${selectedModule === Number(module) ? "active" : ""} ${Number(module) > 1 && !isAuthenticated ? "locked" : ""}`}
                            onClick={() => handleModuleChange(Number(module))}
                            title={`Select module ${module}: ${data.questions[Number(module)]} ${Number(module) > 1 && !isAuthenticated ? "(Login required)" : ""}`}
                        >
                            <div className="module-text">
                                <span className="module-title">{data.questions[Number(module)]}</span>
                                {Number(module) > 1 && !isAuthenticated && (
                                    <span className="lock-icon" aria-label="Login required">
                    🔒
                  </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="tool-section">
                    <Link to="/stress-checker" className="tool-button" title="Check the rhythm of your words">
            <span className="tool-icon" aria-hidden="true">
              📝
            </span>
                        Check Word Stress
                    </Link>
                </div>
            </div>

            <div className="module-content">
                <div className="content-header">
                    {/* Back to Lessons link integrated in header */}
                    <Link to="/moduleslist" className="back-link">
                        <span className="back-icon">←</span>
                    </Link>
                    <h1>{data.questions[selectedModule]}</h1>
                    <p className="instructor-note">with Annie Finch, award-winning poet & mentor</p>
                    <div className="progress-bar" aria-label="Module progress">
                        <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>

                {showSignupPrompt ? (
                    <PoetcraftPromo />
                ) : (
                    <>
                        <div className={`video-container ${fade ? "fade-out" : "fade-in"}`}>
                            {videoError ? (
                                <div className="video-error" role="alert">
                                    <div className="error-message">
                                        <h3>A gentle interruption</h3>
                                        <p>
                                            We're having trouble playing this video. Like a poem that needs revision, let's try again soon.
                                        </p>
                                        <button onClick={() => setVideoError(false)} title="Retry playing the video">
                                            Try Again
                                        </button>
                                    </div>
                                </div>
                            ) : selectedModule > 1 && !isAuthenticated ? (
                                <div className="login-required-message">
                                    <h3>Login Required</h3>
                                    <p>Please log in to access the rest of the poetry lessons.</p>
                                    <Link to="/login" className="login-button">
                                        Log In to Continue
                                    </Link>
                                </div>
                            ) : (
                                <div className="video-player" role="region" aria-label="Video lesson">
                                    <video
                                        key={selectedModule}
                                        controls
                                        onError={() => setVideoError(true)}
                                        controlsList="nodownload"
                                        playsInline
                                        preload="metadata"
                                        className="fade-in"
                                        aria-label="Lesson video"
                                    >
                                        <source src={data.videoSources[selectedModule]} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}
                        </div>

                        <div className="module-controls">
                            <button
                                className="control-button previous"
                                onClick={() => handleModuleChange(selectedModule - 1)}
                                disabled={selectedModule === 1}
                                title="Go to previous lesson"
                            >
                <span className="button-icon" aria-hidden="true">
                  ←
                </span>
                                Previous Lesson
                            </button>
                            <button
                                className={`control-button ${showLectureSheets ? "primary" : ""}`}
                                onClick={toggleLectureSheets}
                                title={showLectureSheets ? "Hide the lecture materials" : "View lecture materials"}
                            >
                                {showLectureSheets ? "Hide Lecture Materials" : "View Lecture Materials"}
                            </button>
                            <button
                                className="control-button next"
                                onClick={handleContinueClick}
                                disabled={selectedModule === Object.keys(data.videoSources).length}
                                title="Proceed to next lesson"
                            >
                                Next Lesson
                                <span className="button-icon" aria-hidden="true">
                  →
                </span>
                            </button>
                        </div>

                        {showLectureSheets && (
                            <div className="module-notes slide-toggle">
                                <h3>Lecture Materials</h3>
                                <p className="notes-description">
                                    These supporting materials will help deepen your understanding of this lesson's concepts.
                                </p>

                                <div className="lecture-sheets-container">
                                    {data.lectureSheets.map((sheet, index) => (
                                        <div key={index} className="lecture-sheet-item">
                                            <div className="lecture-sheet-header">
                                                <h4>{sheet.title}</h4>
                                            </div>
                                            <div className="pdf-embed">
                                                <iframe
                                                    src={`${sheet.pdf}#toolbar=0&navpanes=0`}
                                                    width="100%"
                                                    height="480px"
                                                    title={`Lecture Sheet: ${sheet.title}`}
                                                ></iframe>
                                                <button
                                                    className="control-button"
                                                    onClick={() => window.open(sheet.pdf, "_blank")}
                                                    title={`Download PDF for ${sheet.title}`}
                                                >
                                                    Download PDF
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
                {/* Add sticky navigation footer for mobile users */}
                <div className="mobile-nav-footer">
                    <Link to="/moduleslist" className="back-link mobile-back">
                        <span className="back-icon">←</span> Back to Lessons
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MeterModule
