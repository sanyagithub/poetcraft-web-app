"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../authContext"
import "./style/VideoModule.css"
import { canUserAccessLesson, getUserAccessLevel } from "./user-access-config"

// Define the module data for each type
const moduleData = {
    video: {
        type: "video",
        title: "Video Module",
        theme: "red",
        videoSources: {
            1: "PF_6IDeOYzY",
            2: "m5EYZ7N-UNc",
            3: "M5yspA3TJr0",
            4: "qTbjJOoMDp4",
            5: "uqvVs4Cl9mg",
            6: "x12FHx9h1oA",
            7: "LkcaPCHob14",
            8: "jCIjLDLyw8A",
            9: "LYp7FKh2SMg",
            10: "fcf_Sc9juwY",
            11: "S77TL67BggQ",
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
            1: "bk9VH15NE0Q",
            2: "l7kJ9tkntDU",
            3: "d4dCOwlvzvc",
            4: "qQzb7iZCMZY",
            5: "IoYkRK75u4k",
            6: "BoIDneTHufo",
            7: "fKfnz7694h8",
            8: "mvHxStVEjnM",
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
            1: "gPSmF_L28lU",
            2: "GFl9mE2ZFJo",
            3: "DyUgVwh7XfU",
            4: "HZoL9Mb3haU",
            5: "iVnGHwEeZ9g",
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
            1: "TN3Aolyz_RE",
            2: "xmPoHjGxMNM",
            3: "5EwtGyIaqpo",
            4: "USiLUH52Wp0",
            5: "LevcFjn97YE",
            6: "Xx_AhmPkCzU",
            7: "73tbvCCZ5eo",
            8: "v_PfZk8a3r4",
            9: "fkezx4VgD3A",
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
            1: "95-_yxaodCY",
            2: "V0brX1QpXDs",
            3: "l-Ww1sRf0u8",
            4: "LMhIrNfOUtA",
            5: "zeesaM0j_Rs",
            6: "X9oGFwkus9s",
            7: "tiGD334vDI8",
            8: "GrJO9cDQbLk",
            9: "quBECFh7Ux8",
            10: "CxVYjhMcoKc",
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

const trackEvent = (name, label, category = "meter_module") => {
    if (window.gtag) {
        window.gtag("event", name, {
            event_category: category,
            event_label: label,
        })
    }
}

function MeterModule({ moduleType }) {
    const data = moduleData[moduleType]
    const { isAuthenticated, username } = useAuth() // Using your auth context structure
    const navigate = useNavigate()

    const [selectedModule, setSelectedModule] = useState(1)
    const [videoError, setVideoError] = useState(false)
    const [showLectureSheets, setShowLectureSheets] = useState(false)
    const [fade, setFade] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    const [showModuleList, setShowModuleList] = useState(false)

    useEffect(() => {
        // Load YouTube API once
        const tag = document.createElement("script")
        tag.src = "https://www.youtube.com/iframe_api"
        document.body.appendChild(tag)

        // Cleanup on unmount
        return () => {
            document.body.removeChild(tag)
        }
    }, [])

    useEffect(() => {
        window.onYouTubeIframeAPIReady = () => {
            const player = new window.YT.Player(`youtube-player`, {
                events: {
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            window.gtag("event", "video_played", {
                                event_category: "video",
                                event_label: `${moduleType} - ${selectedModule}`,
                            })
                        }
                    },
                },
            })
        }
    }, [selectedModule, moduleType])

    useEffect(() => {
        // Set initial module to first accessible lesson
        if (!canUserAccessLesson(username, moduleType, selectedModule, isAuthenticated)) {
            setSelectedModule(1) // Always start with lesson 1
        }
    }, [moduleType, isAuthenticated, username])

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)
            if (!mobile) setShowModuleList(true)
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Handle module change with access control
    const handleModuleChange = (moduleNumber) => {
        if (moduleNumber < 1 || moduleNumber > Object.keys(data.videoSources).length) return

        const label = `${moduleType} - Module ${moduleNumber}`

        // Check if user can access this lesson
        if (!canUserAccessLesson(username, moduleType, moduleNumber, isAuthenticated)) {
            trackEvent("locked_module_attempted", label)
            // Redirect to login page or show upgrade message
            navigate("/login")
            trackEvent("redirect_to_login", label)
            return
        }

        trackEvent("module_selected", label)

        setFade(true)
        setTimeout(() => {
            setSelectedModule(moduleNumber)
            setFade(false)
        }, 300)
    }

    const handleContinueClick = () => {
        const nextModule = selectedModule + 1
        const label = `${moduleType} - Module ${nextModule}`

        // Check if user can access the next lesson
        if (!canUserAccessLesson(username, moduleType, nextModule, isAuthenticated)) {
            trackEvent("locked_module_attempted", label)
            navigate("/login")
            trackEvent("redirect_to_login", label)
            return
        }

        trackEvent("continue_clicked", label)
        handleModuleChange(nextModule)
    }

    const toggleLectureSheets = () => {
        trackEvent(
            showLectureSheets ? "hide_lecture_materials" : "show_lecture_materials",
            `${moduleType} - Module ${selectedModule}`,
        )

        setShowLectureSheets((prev) => !prev)
    }

    const progressPercentage = (selectedModule / Object.keys(data.videoSources).length) * 100

    // Get user's access level for progress indication
    const userAccessLevel = getUserAccessLevel(username, moduleType, isAuthenticated)

    return (
        <div className={`module-container theme-${data.theme}`} role="main">
            <div className="module-sidebar" role="navigation">
                <div className="welcome-section-video">
                    <h2>Your Poetry Journey Begins Here</h2>
                    <p className="welcome-text">
                        Discover the hidden structures that have powered poetry for centuries, with gentle guidance from Annie
                        Finch.
                    </p>
                    {isAuthenticated && (
                        <div className="access-info">
                            <p className="access-level">
                                Welcome {username}! You have access to {userAccessLevel} of {Object.keys(data.videoSources).length}{" "}
                                lessons in this module
                            </p>
                        </div>
                    )}
                </div>

                {isMobile && (
                    <button
                        className="toggle-module-list"
                        onClick={() => {
                            trackEvent("mobile_module_toggle", `now ${!showModuleList ? "open" : "collapsed"}`)
                            setShowModuleList((prev) => !prev)
                        }}
                    >
                        {showModuleList ? "Hide Lessons ▲" : "Show Lessons ▼"}
                    </button>
                )}

                <div className={`module-list ${isMobile && !showModuleList ? "collapsed" : ""}`}>
                    {Object.keys(data.videoSources).map((module) => {
                        const moduleNum = Number(module)
                        const hasAccess = canUserAccessLesson(username, moduleType, moduleNum, isAuthenticated)
                        const requiresUpgrade = !hasAccess

                        return (
                            <button
                                key={module}
                                className={`module-button ${selectedModule === moduleNum ? "active" : ""} ${requiresUpgrade ? "locked" : ""}`}
                                onClick={() => handleModuleChange(moduleNum)}
                                title={`Select module ${module}: ${data.questions[moduleNum]} ${requiresUpgrade ? "(Upgrade required)" : ""}`}
                            >
                                <div className="module-text">
                                    <span className="module-title">{data.questions[moduleNum]}</span>
                                    {requiresUpgrade && (
                                        <span className="lock-icon" aria-label="Upgrade required">
                      🔒
                    </span>
                                    )}
                                </div>
                            </button>
                        )
                    })}
                </div>

                {!isMobile && (
                    <div className="tool-section">
                        <h3 className="tools-header">Craft Companions</h3>
                        <Link
                            to="/stress-checker"
                            onClick={() => trackEvent("tool_link_clicked", "Check Word Meter")}
                            className="tool-button"
                            title="Check the meter of your words"
                        >
                            Check Word Meter
                        </Link>
                        <a
                            href="https://www.classes.anniefinch.com/"
                            onClick={() => trackEvent("tool_link_clicked", "Annie's Online Classes")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tool-button"
                            title="Join Annie's Online Classes"
                        >
                            Annie's Online Classes
                        </a>
                    </div>
                )}
            </div>

            <div className="module-content">
                <div className="content-header">
                    <h1>{data.questions[selectedModule]}</h1>
                    <p className="instructor-note">with Annie Finch, award-winning poet & mentor</p>
                    <div className="progress-bar" aria-label="Module progress">
                        <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>

                <div className={`video-container ${fade ? "fade-out" : "fade-in"}`}>
                    {videoError ? (
                        <div className="video-error" role="alert">
                            <div className="error-message">
                                <h3>A gentle interruption</h3>
                                <p>We're having trouble playing this video. Like a poem that needs revision, let's try again soon.</p>
                                <button onClick={() => setVideoError(false)} title="Retry playing the video">
                                    Try Again
                                </button>
                            </div>
                        </div>
                    ) : !canUserAccessLesson(username, moduleType, selectedModule, isAuthenticated) ? (
                        <div className="login-required-message">
                            <h3>{isAuthenticated ? "Upgrade Required" : "Login Required"}</h3>
                            <p>
                                {isAuthenticated
                                    ? "Please upgrade your subscription to access more poetry lessons."
                                    : "Please log in to access the rest of the poetry lessons."}
                            </p>
                            <Link to="/login" className="login-button">
                                {isAuthenticated ? "Upgrade Subscription" : "Log In to Continue"}
                            </Link>
                        </div>
                    ) : (
                        <div className="video-player" role="region" aria-label="Video lesson">
                            <iframe
                                width="100%"
                                height="500"
                                src={`https://www.youtube.com/embed/${data.videoSources[selectedModule]}?cc_load_policy=0&enablejsapi=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>

                <div className="module-controls">
                    <button
                        className="control-button previous"
                        onClick={() => {
                            trackEvent("previous_clicked", `${moduleType} - Module ${selectedModule - 1}`)
                            handleModuleChange(selectedModule - 1)
                        }}
                        disabled={selectedModule === 1}
                        title="Go to previous lesson"
                    >
            <span className="button-icon" aria-hidden="true">
              ←
            </span>
                        Previous Lesson
                    </button>
                    {isAuthenticated && (
                        <button
                            className={`control-button ${showLectureSheets ? "primary" : ""}`}
                            onClick={toggleLectureSheets}
                            title={showLectureSheets ? "Hide the lecture materials" : "View lecture materials"}
                        >
                            {showLectureSheets ? "Hide Lecture Materials" : "View Lecture Materials"}
                        </button>
                    )}
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
                                            onClick={() => {
                                                trackEvent("pdf_downloaded", sheet.title)
                                                window.open(sheet.pdf, "_blank")
                                            }}
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

                {isMobile && (
                    <div className="tool-section mobile-tool-section">
                        <h3 className="tools-header">✨ Craft Companions</h3>
                        <Link to="/stress-checker" className="tool-button">
                            📝 &nbsp; Check Word Meter
                        </Link>
                        <a
                            href="https://www.classes.anniefinch.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tool-button"
                        >
                            🎓 &nbsp; Annie's Online Classes
                        </a>
                    </div>
                )}

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
