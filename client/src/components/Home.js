import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/Home.css";
import Muse from "./Muse";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <div className="content-wrapper">
                <header className="landing-header">
                    <h1 className="brand-title">PoetCraft</h1>
                    <div className="expert-credit">Designed with the expertise of Annie Finch</div>
                </header>

                <main className="landing-main">
                    <div className="muse-section">
                        <Muse
                            type="welcome"
                            message="Hi! I'm Muse, your friendly poetry guide. Let's explore the beautiful world of poetry together!"
                        />
                    </div>


                    <section className="journey-section">
                        <h2 className="journey-title">How to Begin Your Journey</h2>
                        <div className="steps-container">
                            <div className="step-card">
                                <div className="step-number">1</div>
                                <h3>Create Your Account</h3>
                                <p>Sign up with your email address to join our welcoming community</p>
                            </div>

                            <div className="step-card">
                                <div className="step-number">2</div>
                                <h3>Access Your Lessons</h3>
                                <p>Start with our carefully crafted introduction to poetry</p>
                            </div>

                            <div className="step-card">
                                <div className="step-number">3</div>
                                <h3>Learn at Your Pace</h3>
                                <p>Take your time to explore and enjoy each poetry lesson</p>
                            </div>
                        </div>
                    </section>

                    <section className="cta-section">
                        <Link to="/module" className="cta-button signup">Start Learning...</Link>
                    {/*<div className="login-prompt">*/}
                    {/*    Already have an account? <Link to="/login" className="login-link">Sign In</Link>*/}
                    {/*</div>*/}
                </section>
            </main>
            </div>
        </div>
    );
}

export default Home
