import React, { useState, useEffect } from "react";
import "./style/VideoModule.css";
import Question from "./Question";
import Muse from "./Muse";
import { Link } from 'react-router-dom';
import PoetcraftPromo from "./PoetcraftPromo";

function VideoModule() {
    const [selectedModule, setSelectedModule] = useState(1);
    const [videoError, setVideoError] = useState(false);
    const [showSignupPrompt, setShowSignupPrompt] = useState(false);

    // Google Form URL - Replace with your actual Google Form URL
    const GOOGLE_FORM_URL = "https://forms.gle/dRUE4woGyq8Hueh76";

    // Define video sources mapping
    const videoSources = {
        1: "/videos/video1.mp4",
        2: "/videos/video2.mp4",
        3: "/videos/video3.mp4",
        4: "/videos/video4.mp4",
        5: "/videos/video5.mp4",
        6: "/videos/video6.mp4",
        7: "/videos/video7.mp4",
        8: "/videos/video8.mp4",
        9: "/videos/video9.mp4",
        10: "/videos/video10.mp4",
        11: "/videos/video11.mp4"
    };

    // Reset video error when module changes
    useEffect(() => {
        setVideoError(false);

        // Show signup prompt when trying to access modules beyond the free preview
        if (selectedModule > 2) {
            setShowSignupPrompt(true);
            setSelectedModule(2); // Keep the user on the last free module
        } else {
            setShowSignupPrompt(false);
        }
    }, [selectedModule]);

    const handleModuleChange = (moduleNumber) => {
        if (moduleNumber < 1) return;

        // Allow free access only to modules 1 and 2
        if (moduleNumber > 2) {
            setShowSignupPrompt(true);
            return;
        }

        setSelectedModule(moduleNumber);
    };

    const handleContinueClick = () => {
        if (selectedModule < 2) {
            // If on module 1, simply go to module 2
            setSelectedModule(selectedModule + 1);
        } else {
            // If on module 2, show the signup prompt
            setShowSignupPrompt(true);
        }
    };

    const redirectToGoogleForm = () => {
        window.open(GOOGLE_FORM_URL, '_blank');
    };

    return (
        <div className="module-container">
            <div className="module-sidebar">
                <div className="welcome-section">
                    <Muse type="welcome" />
                    <h2>Your Poetry Journey Begins Here</h2>
                    <p className="welcome-text">
                        Experience the joy of understanding poetry with expert guidance from Annie Finch.
                    </p>
                </div>

                <div className="module-list">
                    {/* Show first two modules as available */}
                    {[1, 2].map((module) => (
                        <button
                            key={module}
                            className={`module-button ${selectedModule === module ? 'active' : ''}`}
                            onClick={() => handleModuleChange(module)}
                        >
                            Lesson {module}: {getModuleTitle(module)}
                        </button>
                    ))}

                    {/* Show remaining modules as locked */}
                    {[3, 4, 5, 6, 7, 8, 9, 10, 11].map((module) => (
                        <button
                            key={module}
                            className="module-button locked"
                            onClick={() => setShowSignupPrompt(true)}
                        >
                            <span className="lock-icon">🔒</span> Lesson {module}: {getModuleTitle(module)}
                        </button>
                    ))}
                </div>

                <div className="tool-section">
                    <Link to="/stress-checker" className="tool-button">
                        <span className="tool-icon">📝</span>
                        Check Word Stress
                    </Link>
                </div>
            </div>

            <div className="module-content">
                <div className="content-header">
                    <h1>{getModuleTitle(selectedModule)}</h1>
                    <p className="instructor-note">Learn with Annie Finch</p>
                </div>

                {showSignupPrompt ? (
                    <PoetcraftPromo />
                ) : (
                    <>
                        <div className="video-container">
                            {videoError ? (
                                <div className="video-error">
                                    <Muse
                                        type="reading"
                                        message="Oops! We're having trouble playing this video. Please try again later."
                                    />
                                </div>
                            ) : (
                                <div className="video-player">
                                    <video
                                        key={selectedModule}
                                        controls
                                        onError={() => setVideoError(true)}
                                        controlsList="nodownload"
                                        playsInline
                                        preload="metadata"
                                    >
                                        <source
                                            src={videoSources[selectedModule]}
                                            type="video/mp4"
                                        />
                                        <track
                                            kind="captions"
                                            src={`/captions/captions${selectedModule}.vtt`}
                                            srcLang="en"
                                            label="English"
                                            default
                                        />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}
                        </div>

                        <div className="module-controls">
                            <button
                                className="control-button"
                                onClick={() => handleModuleChange(selectedModule - 1)}
                                disabled={selectedModule === 1}
                            >
                                Previous Lesson
                            </button>
                            <button
                                className="control-button primary"
                                onClick={handleContinueClick}
                            >
                                {selectedModule < 2 ? "Continue to Next Lesson" : "Continue Your Poetry Journey"}
                            </button>
                        </div>

                        {/*<div className="module-questions">*/}
                        {/*    <Question*/}
                        {/*        videoId={selectedModule}*/}
                        {/*        question={getQuestions(selectedModule)}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {selectedModule <= 2 && (
                            <div className="preview-ending">
                                <h3>Ready to master metrical poetry?</h3>
                                <p>Continue your poetry journey by joining our May 2025 founding cohort.</p>
                                <button
                                    className="signup-button-small"
                                    onClick={() => setShowSignupPrompt(true)}
                                >
                                    Learn More About Our Full Program
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

// Helper function for VideoModule
function getModuleTitle(moduleNumber) {
    const titles = {
        1: "What is a poem?",
        2: "Understanding Art and Society in Poetry",
        3: "Breath and Line Breaks: The Foundation of Rhythm",
        4: "The Beat and Tempo: Feeling the Pulse of a Poem",
        5: "Soft and Strong Syllables: Building Poetic Flow",
        6: "Marking Stress: Symbols and Scansion Basics",
        7: "Writing in iambic meter",
        8: "Writing in trochaic meter",
        9: "Writing in dactylic meter",
        10: "Writing in anapestic meter",
        11: "Putting It All Together: Final Patterns and Nuances"
    };
    return titles[moduleNumber] || "Untitled Module";
}

function getQuestions(moduleNumber) {
    const questions = {
        1: "What is a poem to you?",
        2: "How many heartbeats do you feel each time you breathe in or out ?",
        3: "What do you think are beats?",
        4: "What is the next syllable that gets a beat?",
        5: "What symbols do we use to mark the stronger syllables?",
        6: "Write down the syllables with the strong accents below..",
        7: "How are these syllables you marked different from the other syllables?",
        8: "What are the 3 things that make stressed syllables different from the unstressed syllables?",
        9: "What are the syllables that get a cup? ",
        10: "Where will we mark the next edge?",
        11: "What was the final pattern in the poem?"
    };
    return questions[moduleNumber] || "Untitled Module";
}

export default VideoModule;
