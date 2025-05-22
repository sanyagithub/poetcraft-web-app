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
import ModulesList from "./components/ModulesList";
import AnapesticMeter from "./components/AnapesticMeter";
import IambicMeter from "./components/IambicMeter";
import TrochaicMeter from "./components/TrochaicMeter";
import DactylicMeter from "./components/DactylicMeter";
import TapMeterGame from "./components/TapMeterGame";
import PaymentPage from "./components/PaymentPage";

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
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/videolessons" element={<VideoModule />} />
                    <Route path="/poetrycompetition" element={<PoetryCompetitionPage />}/>
                    <Route path="/moduleslist" element={<ModulesList />} />
                    <Route path="/anapestic-meter" element={<AnapesticMeter />} />
                    <Route path="/iambic-meter" element={<IambicMeter />} />
                    <Route path="/trochaic-meter" element={<TrochaicMeter />} />
                    <Route path="/dactylic-meter" element={<DactylicMeter />} />
                    <Route path="/paymentpage" element={<PaymentPage />} />

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
