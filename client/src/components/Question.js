import React, { useEffect, useState } from "react";
import "./style/Question.css";
import Muse from "./Muse";
import axios from "axios";
import { useAuth } from "../authContext";

function Question({ videoId, question, onSubmit }) {
    // Group related states
    const [answerState, setAnswerState] = useState({
        text: "",
        isSubmitting: false,
        isSubmitted: false,
        error: null
    });
    const [showGuidance, setShowGuidance] = useState(false);
    const [communityAnswers, setCommunityAnswers] = useState([]);
    const [loadingAnswers, setLoadingAnswers] = useState(false);

    const { username } = useAuth();

    const handleSubmit = async () => {
        if (answerState.text.trim().length < 10) {
            setAnswerState(prev => ({
                ...prev,
                error: "Please write a more detailed response (at least 10 characters)"
            }));
            return;
        }

        setAnswerState(prev => ({ ...prev, isSubmitting: true, error: null }));

        try {
            const response = await axios.post('https://api.poetcraft.org/api/answers/submit', {
                username,
                videoId,
                answer: answerState.text.trim()
            });

            if (response.data) {
                setAnswerState(prev => ({
                    ...prev,
                    isSubmitted: true,
                    text: "",
                    isSubmitting: false
                }));
                // Refresh community answers after submission
                await loadCommunityAnswers();
            }
        } catch (error) {
            setAnswerState(prev => ({
                ...prev,
                error: error.response?.data || "Unable to submit your answer. Please try again.",
                isSubmitting: false
            }));
        }
    };

    const loadCommunityAnswers = async () => {
        setLoadingAnswers(true);
        try {
            const response = await axios.get(`https://api.poetcraft.org/api/answers/${videoId}`);
            setCommunityAnswers(response.data);
        } catch (error) {
            console.error("Error loading community answers:", error);
        } finally {
            setLoadingAnswers(false);
        }
    };

    useEffect(() => {
        loadCommunityAnswers();
    }, [videoId]);

    return (
        <div className="question-container">
            <div className="question-content">
                <p className="question-text">{question}</p>

                {/* Answer Input Section */}
                <div className="answer-section">
                    <textarea
                        id="answer-input"
                        className="answer-input"
                        placeholder="Type your thoughts here..."
                        value={answerState.text}
                        onChange={(e) => setAnswerState(prev => ({ ...prev, text: e.target.value }))}
                        rows="6"
                        disabled={answerState.isSubmitting}
                    />

                    {answerState.error && (
                        <div className="error-message">{answerState.error}</div>
                    )}

                    <div className="button-container">
                        <button
                            className="guidance-toggle"
                            onClick={() => setShowGuidance(!showGuidance)}
                        >
                            Need Help?
                        </button>
                        <button
                            className="clear-button"
                            onClick={() => setAnswerState(prev => ({ ...prev, text: "" }))}
                        >
                            Clear Response
                        </button>
                        <button
                            className="submit-button"
                            onClick={handleSubmit}
                            disabled={answerState.isSubmitting}
                        >
                            {answerState.isSubmitting ? "Submitting..." : "Share Your Response"}
                        </button>
                    </div>
                </div>

                {/* Guidance Box */}
                {showGuidance && (
                    <div className="guidance-box">
                        <h4>Tips for Answering:</h4>
                        <ul>
                            <li>Take your time to think about the question</li>
                            <li>Share your personal thoughts and experiences</li>
                            <li>Write at least a few sentences</li>
                            <li>There are no wrong answers - this is about your journey!</li>
                        </ul>
                    </div>
                )}

                {/* Community Answers Section */}
                <div className="community-answers">
                    <h4>Community Responses</h4>
                    {loadingAnswers ? (
                        <p className="loading-message">Loading responses...</p>
                    ) : (
                        <div className="answers-list">
                            {communityAnswers.map((answer, index) => (
                                <div key={index} className="community-answer">
                                    {/*<div className="answer-header">*/}
                                    {/*    <span className="answer-author">{answer.username}</span>*/}
                                    {/*</div>*/}
                                    <p className="answer-content">{answer.answer}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Question;
