import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "./style/auth.css";
import axios from "axios";
import Muse from "./Muse";

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            // Make API call to register endpoint
            const response = await axios.post("https://api.poetcraft.org/api/auth/register", {
                username: formData.username,
                password: formData.password,
            });

            if (response.data) {
                // Registration successful
                // Now login the user automatically
                const loginResponse = await axios.post("https://api.poetcraft.org/api/auth/login", {
                    username: formData.username,
                    password: formData.password,
                });

                // Store the token
                localStorage.setItem("token", loginResponse.data.token);
                localStorage.setItem("username", formData.username);

                // Redirect to home page
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data || "An error occurred during registration");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="auth-container">
            <Muse
                type="welcome"
                message="Ready to continue your poetry journey? Join our community to access all lessons!"
            />
            <div className="auth-card">
                <h2>Enter the details:</h2>
                {/*<p className="auth-subtitle">Begin your poetic journey with PoetCraft</p>*/}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username or Email</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username or email"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Create Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a secure password"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="form-input"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account?</p>
                    <Link to="/login" className="login-link">
                        Sign In Here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp
