import React, {useState, useEffect, useRef} from "react";
import "./style/VideoModule.css";
import Question from "./Question";
import Muse from "./Muse";
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from "../authContext";

function VideoModule() {
    const [selectedModule, setSelectedModule] = useState(1);
    const [videoError, setVideoError] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

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

    // Preview content for first lesson
    const previewContent = {
        title: "Welcome to Poetry",
        description: "Join Annie Finch on a journey into the magical world of poetry",
        videoUrl: "/videos/video1.mp4"
    };

    const handleNextLesson = () => {
        if (!isAuthenticated) {
            navigate('/login', {
                // We can pass state to indicate where the user came from
                state: {
                    returnTo: '/module',
                    message: 'Sign in to continue your poetry journey'
                }
            });
        } else {
            setSelectedModule(selectedModule + 1);
        }
    };

    return (
        <div className="module-container">
            <div className="module-sidebar">
                <div className="welcome-section">
                    <Muse
                        type="welcome"
                    />
                    <h2>Your Poetry Journey Begins Here</h2>
                    <p className="welcome-text">
                        Experience the joy of understanding poetry with expert guidance from Annie Finch.
                    </p>
                </div>

                {isAuthenticated ? (
                    // Full lesson list for authenticated users
                    <div className="module-list">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((module) => (
                            <button
                                key={module}
                                className={`module-button ${selectedModule === module ? 'active' : ''}`}
                                onClick={() => setSelectedModule(module)}
                            >
                                Lesson {module}: {getModuleTitle(module)}
                            </button>
                        ))}
                    </div>
                ) : (
                    // Preview of upcoming lessons for non-authenticated users
                    <div className="preview-lessons">
                        <h3>What You'll Learn:</h3>
                        <div className="lesson-preview">
                            <div className="preview-item">
                                <span className="check-icon">✓</span>
                                Understanding Poetic Meter
                            </div>
                            <div className="preview-item">
                                <span className="check-icon">✓</span>
                                Mastering Rhyme Patterns
                            </div>
                            <div className="preview-item">
                                <span className="check-icon">✓</span>
                                Exploring Traditional Forms
                            </div>
                        </div>
                    </div>
                )}

                <div className="tool-section">
                    <Link to="/stress-checker" className="tool-button">
                        <span className="tool-icon">📝</span>
                        Check Word Stress
                    </Link>
                </div>
            </div>

            <div className="module-content">
                <div className="content-header">
                    <h1>{isAuthenticated ? getModuleTitle(selectedModule) : previewContent.title}</h1>
                    <p className="instructor-note">Learn with Annie Finch</p>
                </div>

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
                            key={selectedModule} // Force video reload when source changes
                            //ref={videoRef}
                            // width="100%"
                            // height="auto"
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
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    margin: '60px auto'
                                }}
                            />
                            Your browser does not support the video tag.
                        </video>
                            {/*{currentCaptions && (*/}
                            {/*    <div className="custom-captions-container">*/}
                            {/*        <div className="custom-captions-text">*/}
                            {/*            {currentCaptions}*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </div>
                    )}
                </div>

                <div className="module-controls">
                    <button
                        className="control-button"
                        disabled={true}
                    >
                        Previous Lesson
                    </button>
                    <button
                        className="control-button primary"
                        onClick={handleNextLesson}
                    >
                        Continue to Next Lesson
                    </button>
                </div>

                {/*{showLoginPrompt && (*/}

                {/*    <div className="login-prompt">*/}
                {/*        <Muse*/}
                {/*            type="welcome"*/}
                {/*            message="Ready to continue your poetry journey? Join our community to access all lessons!"*/}
                {/*        />*/}
                {/*        <div className="prompt-buttons">*/}
                {/*            <Link to="/login" className="prompt-button">Sign In</Link>*/}
                {/*            <Link to="/signup" className="prompt-button primary">Create Free Account</Link>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*)}*/}

                {!isAuthenticated && (
                    <div className="module-notes">
                        <h3>About PoetCraft</h3>
                        <div className="notes-content">
                            <p>PoetCraft is designed to make poetry accessible and enjoyable for everyone. Our lessons
                                are crafted with care by renowned poet Annie Finch, making complex concepts clear and
                                engaging.</p>
                        </div>
                    </div>

                )}

                {isAuthenticated && (<div className="module-questions">
                    <Question
                        videoId={selectedModule}
                        question={getQuestions(selectedModule)}
                        // onSubmit={async (data) => {
                        //     // Handle submission logic
                        //     console.log("Submitted answer:", data);
                        // }}
                     />
                 </div> )}


            </div>
        </div>
    );
}

// function VideoModule() {
//     const [selectedModule, setSelectedModule] = useState(1);
//     const [videoError, setVideoError] = useState(false);
//     // const videoRef = useRef(null);
//     // const [currentCaptions, setCurrentCaptions] = useState('');
//     //
//     // useEffect(() => {
//     //     if (videoRef.current) {
//     //         const video = videoRef.current;
//     //         if (video.textTracks && video.textTracks[0]) {
//     //             const track = video.textTracks[0];
//     //             track.mode = 'hidden'; // Hide default captions
//     //
//     //             track.addEventListener('cuechange', () => {
//     //                 if (track.activeCues && track.activeCues.length > 0) {
//     //                     setCurrentCaptions(track.activeCues[0].text);
//     //                 } else {
//     //                     setCurrentCaptions('');
//     //                 }
//     //             });
//     //         }
//     //     }
//     // }, []);
//
//     // Define video sources mapping
//     const videoSources = {
//         1: "/videos/video1.mp4",
//         2: "/videos/video2.mp4",
//         3: "/videos/video3.mp4",
//         4: "/videos/video4.mp4",
//         5: "/videos/video5.mp4",
//         6: "/videos/video6.mp4",
//         7: "/videos/video7.mp4",
//         8: "/videos/video8.mp4",
//         9: "/videos/video9.mp4",
//         10: "/videos/video10.mp4",
//         11: "/videos/video11.mp4"
//
//     };
//
//     // Reset video error when module changes
//     useEffect(() => {
//         setVideoError(false);
//     }, [selectedModule]);
//
//     const handleModuleChange = (moduleNumber) => {
//         if (moduleNumber < 1 || moduleNumber > 11) return;
//         setSelectedModule(moduleNumber);
//     };
//
//     return (
//         <div className="module-container">
//             <div className="module-sidebar">
//                 <Muse
//                     type="reading"
//                     message="Ready to learn something new? Let's get started!"
//                 />
//                 <h2>Your Poetry Lessons</h2>
//                 <div className="module-list">
//                     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((module) => (
//                         <button
//                             key={module}
//                             className={`module-button ${selectedModule === module ? 'active' : ''}`}
//                             onClick={() => handleModuleChange(module)}
//                             onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleModuleChange(module)}
//                             tabIndex="0"
//                         >
//                             Lesson {module}: {getModuleTitle(module)}
//                         </button>
//                     ))}
//                 </div>
//                 {/*<div className="tools-introduction">*/}
//                 {/*    <Muse*/}
//                 {/*        type="writing"*/}
//                 {/*        message="Need help understanding a word's rhythm? Try our Poetry Tools!"*/}
//                 {/*    />*/}
//                 {/*</div>*/}
//                 <div className="tool-section">
//                     {/*<h3>Poetry Tools</h3>*/}
//                     <Link to="/stress-checker" className="tool-button">
//                         <span className="tool-icon">📝</span>
//                         Check Word Stress
//                     </Link>
//                 </div>
//             </div>
//
//             <div className="module-content">
//                 <h1>{getModuleTitle(selectedModule)}</h1>
//                 <div className="video-container">
//                     {videoError ? (
//                         <div className="video-error">
//                             <Muse
//                                 type="reading"
//                                 message="Oops! We're having trouble playing this video. Please try again later."
//                             />
//                         </div>
//                     ) : (
//                         <div className="video-player">
//                         <video
//                             key={selectedModule} // Force video reload when source changes
//                             //ref={videoRef}
//                             // width="100%"
//                             // height="auto"
//                             controls
//                             onError={() => setVideoError(true)}
//                             controlsList="nodownload"
//                             playsInline
//                             preload="metadata"
//                         >
//                             <source
//                                 src={videoSources[selectedModule]}
//                                 type="video/mp4"
//                             />
//                             <track
//                                 kind="captions"
//                                 src={`/captions/captions${selectedModule}.vtt`}
//                                 srcLang="en"
//                                 label="English"
//                                 default
//                                 style={{
//                                     position: 'relative',
//                                     width: '100%',
//                                     margin: '60px auto'
//                                 }}
//                             />
//                             Your browser does not support the video tag.
//                         </video>
//                             {/*{currentCaptions && (*/}
//                             {/*    <div className="custom-captions-container">*/}
//                             {/*        <div className="custom-captions-text">*/}
//                             {/*            {currentCaptions}*/}
//                             {/*        </div>*/}
//                             {/*    </div>*/}
//                             {/*)}*/}
//                         </div>
//                     )}
//                 </div>
//
//                 <div className="module-controls">
//                     <button
//                         className="control-button"
//                         onClick={() => handleModuleChange(selectedModule - 1)}
//                         disabled={selectedModule === 1}
//                         aria-label="Previous Lesson"
//                     >
//                         Previous Lesson
//                     </button>
//                     <button
//                         className="control-button primary"
//                         onClick={() => handleModuleChange(selectedModule + 1)}
//                         disabled={selectedModule === 11}
//                         aria-label="Next Lesson"
//                     >
//                         Next Lesson
//                     </button>
//                 </div>
//
//                 <div className="module-questions">
//                     <Question
//                         videoId={selectedModule}
//                         question={getQuestions(selectedModule)}
//                         onSubmit={async (data) => {
//                             // Handle submission logic
//                             console.log("Submitted answer:", data);
//                         }}
//                     />
//                 </div>
//
//                 {/*<div className="module-notes">*/}
//                 {/*    <h3>Lesson Notes</h3>*/}
//                 {/*    <div className="notes-content">*/}
//                 {/*        <p>Key points from this lesson will appear here...</p>*/}
//                 {/*    </div>*/}
//                 {/*</div>*/}
//             </div>
//         </div>
//     );
// }

// Helper function for VideoModule
function getModuleTitle(moduleNumber) {
    const titles = {
        1: "What is a poem?",
        2: "Understanding Art and Society in Poetry",
        3: "Breath and Line Breaks: The Foundation of Rhythm",
        4: "The Beat and Tempo: Feeling the Pulse of a Poem",
        5: "Soft and Strong Syllables: Building Poetic Flow",
        6: "Marking Stress: Symbols and Scansion Basics",
        7: "Marking the stressed accents",
        8: "Difference between syllable sounds",
        9: "Marking the unstressed accents",
        10: "Marking the Edges",
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
