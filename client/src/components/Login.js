import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./style/auth.css";
import {useAuth} from "../authContext";
import axios from "axios";

function Login() {

    const location = useLocation();

    useEffect(() => {
        if (!window.gtag) return;

        window.gtag("config", "G-B118D7BLD5", {
            page_path: location.pathname + location.search,
        });
    }, [location]);


    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("https://api.poetcraft.org/api/auth/login", {
                username: formData.username,
                password: formData.password,
            });

            if (response.data.token) {
                // Use the login function from AuthContext
                // Store the token
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", formData.username);
                login(response.data.token, formData.username);
                navigate("/moduleslist"); // Redirect to home page
            }
        } catch (err) {
            setError(
                err.response?.data ||
                "Unable to login. Please check your credentials and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {/*<Muse*/}
            {/*    type="welcome"*/}
            {/*    message="Sign in to continue your poetry journey"*/}
            {/*/>*/}
            <div className="auth-card">
                <h2>Enter the details:</h2>

                {/* Pre-launch access note */}
                <div className="pre-launch-notice">
                    <p>Poetcraft is currently in pre-launch phase.</p>
                    <p>To get access credentials, please sign up for our soft launch offer ($99).</p>
                    <a href="https://anniefinch.thrivecart.com/mastering-meter--expert-led-video-course/"
                       className="payment-link"
                       target="_blank"
                       rel="noopener noreferrer">
                        Get Access to Poetcraft
                    </a>
                    <p className="access-info">After payment, you'll receive login credentials via email within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">Email or Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your email or username"
                            className="form-input"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="form-input"
                        />
                        {/*<Link to="/forgot-password" className="forgot-password">*/}
                        {/*    Forgot your password?*/}
                        {/*</Link>*/}
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? "Loading..." : "Log In"}
                    </button>
                </form>

                {/*<div className="auth-footer">*/}
                {/*    <p>New to PoetCraft?</p>*/}
                {/*    <Link to="/signup" className="signup-link">*/}
                {/*        Create an Account*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default Login
