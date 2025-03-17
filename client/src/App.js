/**
 * FRONTEND: src/App.js
 */
import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import VideoModule from "./components/VideoModule";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import {AuthProvider, useAuth} from './authContext';
import "./App.css";
import * as PropTypes from "prop-types";
import StressChecker from "./components/StressChecker";
import PoetryCompetitionPage from "./components/PoetryCompetitionPage";

// ProtectedRoute component
function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Make VideoModule the landing page */}
                    <Route path="/" element={<VideoModule />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/poetrycompetition" element={<PoetryCompetitionPage />}/>
                    {/* Protected routes for authenticated users */}
                    <Route
                        path="/module/:lessonId"
                        element={
                            <ProtectedRoute>
                                <VideoModule />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/stress-checker"
                        element={
                            <StressChecker />  // Removed ProtectedRoute to allow tool access
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
