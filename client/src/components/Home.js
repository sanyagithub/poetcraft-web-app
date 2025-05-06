import React, {useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./style/Home.css";

function Home() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!window.gtag) return;

        window.gtag("config", "G-B118D7BLD5", {
            page_path: location.pathname + location.search,
        });
    }, [location]);

    return (
        <div className="landing-container">
            <div className="content-wrapper">
                <header className="landing-header">
                    <h1 className="brand-title">PoetCraft</h1>
                    <div className="expert-credit">Designed with the expertise of Annie Finch</div>
                </header>

                <main className="landing-main">
                    <section className="about-section">
                        <div className="about-content">
                            <div className="image-container">
                                <img
                                    src="/annie-sanya.png"
                                    alt="Annie Finch and co-founder"
                                    className="annie-image"
                                />
                                <div className="decorative-element leaf-top"></div>
                                <div className="decorative-element leaf-bottom"></div>
                                <div className="decorative-element spiral-left"></div>
                                <div className="decorative-element spiral-right"></div>
                            </div>
                            <div className="about-text">
                                <h2>Meet Annie Finch and Sanya Khurana</h2>
                                <p>
                                    PoetCraft was created by award-winning poet Annie Finch and technologist and storyteller Sanya Khurana, to bring the timeless beauty of metrical poetry to a wider world. Blending the art of verse with the power of technology, we’re united by a shared passion: to help you rediscover the hidden rhythms that have pulsed through poetry for centuries—subtle, stirring, and profoundly alive.
                                </p>
                            </div>
                        </div>
                    </section>

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
                        <Link to="/moduleslist" className="cta-button signup">Start Learning...</Link>
                    </section>
                </main>
            </div>
            <div className="background-decoration wave-1"></div>
            <div className="background-decoration wave-2"></div>
        </div>
    );
}

export default Home;
