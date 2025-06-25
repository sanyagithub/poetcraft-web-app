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
                <header className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Discover the <span className="highlight">Hidden Music</span> in Poetry
                        </h1>
                        <p className="hero-subtitle">
                            Learn the art of meter and rhythm with renowned poet Annie Finch.
                            Transform your verse from ordinary words into meaningful rhythm.
                        </p>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">2000+</span>
                                <span className="stat-label">Poets Trained</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Hours of Content</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">Award</span>
                                <span className="stat-label">Winning Methods</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="image-container">
                            <img
                                src="/annie-4.png"
                                alt="Annie Finch - Poetry Master"
                                className="annie-image"
                            />
                            <div className="decorative-element leaf-top"></div>
                            <div className="decorative-element leaf-bottom"></div>
                            <div className="decorative-element spiral-left"></div>
                            <div className="decorative-element spiral-right"></div>
                        </div>
                    </div>
                </header>

                <section className="featured-quote">
                    <blockquote>
                        "Poems in metre, when they move with grace and surprise, arrive like a gift from the unconscious to the conscious mind: an act not of calculation but of grace"
                    </blockquote>
                    <cite>— Annie Finch, Award-winning Poet & Metrical Expert</cite>
                </section>

                <main className="main-content">
                    <section className="learning-paths">
                        <div className="section-header">
                            <h2 className="section-title">Choose Your Poetic Journey</h2>
                            <p className="section-description">
                                Whether you're a complete beginner or looking to refine your craft,
                                we have the perfect path to unlock your poetic potential.
                            </p>
                        </div>

                        <div className="paths-container">
                            <div className="path-card featured">
                                <div className="card-badge">Most Popular</div>
                                <div className="card-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M10,16.5L16,12L10,7.5V16.5Z"/>
                                    </svg>
                                </div>
                                <h3>Recorded Masterclasses</h3>
                                <p className="card-description">
                                    Dive deep into Annie's comprehensive video library. Learn the fundamentals
                                    of meter, scan famous poems, and practice with guided exercises.
                                </p>
                                <div className="card-features">
                                    <div className="feature">
                                        <span className="feature-icon">📚</span>
                                        <span>Complete curriculum from basics to advanced</span>
                                    </div>
                                    <div className="feature">
                                        <span className="feature-icon">🎯</span>
                                        <span>Practice exercises with instant feedback</span>
                                    </div>
                                    <div className="feature">
                                        <span className="feature-icon">⏰</span>
                                        <span>Learn at your own pace, lifetime access</span>
                                    </div>
                                </div>
                                <Link to="/moduleslist" className="path-button primary">
                                    Start Learning Now
                                    <span className="button-arrow">→</span>
                                </Link>
                            </div>

                            <div className="path-card">
                                <div className="card-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                                    </svg>
                                </div>
                                <h3>Live Poetry Workshops</h3>
                                <p className="card-description">
                                    Join Annie for intimate, real-time sessions where you can ask questions,
                                    get personalized feedback, and workshop your poems live.
                                </p>
                                <div className="card-features">
                                    <div className="feature">
                                        <span className="feature-icon">🎤</span>
                                        <span>Direct interaction with Annie Finch</span>
                                    </div>
                                    <div className="feature">
                                        <span className="feature-icon">👥</span>
                                        <span>Small groups for personalized attention</span>
                                    </div>
                                    <div className="feature">
                                        <span className="feature-icon">✨</span>
                                        <span>Live poem analysis and critique</span>
                                    </div>
                                </div>
                                <a href="https://www.randolphlundine.com/finch-cottage" target="_blank" rel="noopener noreferrer" className="path-button secondary">
                                    Join Live Sessions
                                    <span className="button-arrow">→</span>
                                </a>
                            </div>

                            <div className="path-card">
                                <div className="card-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25Z"/>
                                    </svg>
                                </div>
                                <h3>Poetry Witchery Community</h3>
                                <p className="card-description">
                                    Connect with fellow poetry enthusiasts, share your work, get feedback,
                                    and participate in monthly challenges and discussions.
                                </p>
                                <div className="card-features">
                                    <div className="feature">
                                        <span className="feature-icon">🌟</span>
                                        <span>Supportive community of poets</span>
                                    </div>
                                    <div className="feature">
                                        <span className="feature-icon">🎭</span>
                                        <span>Monthly writing challenges</span>
                                    </div>
                                    <div className="feature">
                                        <span className="feature-icon">💬</span>
                                        <span>Peer feedback and collaboration</span>
                                    </div>
                                </div>
                                <a href="https://poetrywitch.mn.co/" target="_blank" rel="noopener noreferrer" className="path-button secondary">
                                    Join the Community
                                    <span className="button-arrow">→</span>
                                </a>
                            </div>
                        </div>
                    </section>

                    <section className="about-annie">
                        <div className="about-content">
                            <div className="about-text">
                                <h2>About Annie Finch</h2>
                                <p className="intro-text">
                                    Annie Finch is one of America's foremost authorities on poetic meter and rhythm.
                                    Her groundbreaking work has helped thousands of poets discover the hidden music in their verse.
                                </p>
                                <div className="credentials">
                                    <div className="credential">
                                        <h4>Award-Winning Poet</h4>
                                        <p>Author of seven poetry collections and recipient of numerous literary awards</p>
                                    </div>
                                    <div className="credential">
                                        <h4>Metrical Expert</h4>
                                        <p>Pioneer in contemporary metrical poetry and innovative poetic forms</p>
                                    </div>
                                    <div className="credential">
                                        <h4>Beloved Teacher</h4>
                                        <p>Over 20 years of experience teaching poets at all levels</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="why-meter">
                        <h2>Why Learn Meter?</h2>
                        <div className="benefits-grid">
                            <div className="benefit">
                                <div className="benefit-icon">🎵</div>
                                <h3>Discover Your Natural Rhythm</h3>
                                <p>Tap into the musical patterns that make poetry memorable and moving</p>
                            </div>
                            <div className="benefit">
                                <div className="benefit-icon">🔥</div>
                                <h3>Elevate Your Craft</h3>
                                <p>Transform ordinary poems into extraordinary verse that resonates deeply</p>
                            </div>
                            <div className="benefit">
                                <div className="benefit-icon">🎯</div>
                                <h3>Master the Classics</h3>
                                <p>Understand the techniques used by Shakespeare, Dickinson, and other masters</p>
                            </div>
                            <div className="benefit">
                                <div className="benefit-icon">✨</div>
                                <h3>Find Your Voice</h3>
                                <p>Use meter as a tool for self-expression, not constraint</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <div class="background-decoration wave-1"></div>
            <div class="background-decoration wave-2"></div>
            <div class="floating-elements">
                <div class="floating-element note-1">♪</div>
                <div class="floating-element note-2">♫</div>
                <div class="floating-element note-3">♪</div>
            </div>
        </div>
    );
}

export default Home;
