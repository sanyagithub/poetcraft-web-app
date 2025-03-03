import React from 'react';
import './style/PoetCraftPromo.css'

const PoetcraftPromo = () => {
    // Google Form URL - Replace with your actual Google Form URL
    const GOOGLE_FORM_URL = "https://forms.gle/dRUE4woGyq8Hueh76";

    const redirectToSignup = () => {
        window.open(GOOGLE_FORM_URL, '_blank');
    };

    return (
        <div className="promo-container">
            <div className="promo-content">
                <h1 className="promo-title">Unlock the Art of Metrical Poetry</h1>

                <div className="promo-tagline">
                    Join award-winning poet Annie Finch on a transformative journey into meter & rhythm
                </div>

                <div className="promo-message">
                    You've completed the free preview! Continue your poetic journey with our complete program:
                </div>

                <div className="benefits-container">
                    <div className="benefit-column">
                        <div className="benefit-item">
                            <div className="benefit-icon">✓</div>
                            <div className="benefit-text">
                                <strong>Complete Video Masterclass</strong>
                                <span>9 in-depth lessons on scanning and writing in meter</span>
                            </div>
                        </div>

                        <div className="benefit-item">
                            <div className="benefit-icon">✓</div>
                            <div className="benefit-text">
                                <strong>Interactive Writing Circles</strong>
                                <span>Weekly guided sessions to practice metrical writing</span>
                            </div>
                        </div>

                        <div className="benefit-item">
                            <div className="benefit-icon">✓</div>
                            <div className="benefit-text">
                                <strong>Hands-on Practice</strong>
                                <span>Exclusive scansion exercises with expert feedback</span>
                            </div>
                        </div>

                        <div className="benefit-item">
                            <div className="benefit-icon">✓</div>
                            <div className="benefit-text">
                                <strong>Community Showcase</strong>
                                <span>Virtual open mic to share your metrical creations</span>
                            </div>
                        </div>
                    </div>

                    <div className="benefit-column">
                        <div className="benefit-item">
                            <div className="benefit-icon">✓</div>
                            <div className="benefit-text">
                                <strong>Publication Opportunity</strong>
                                <span>Chance to be featured in our poetry anthology</span>
                            </div>
                        </div>

                        <div className="benefit-item">
                            <div className="benefit-icon">✓</div>
                            <div className="benefit-text">
                                <strong>Exclusive Tools Access</strong>
                                <span>Use our specialized meter-checking tool</span>
                            </div>
                        </div>

                        <div className="benefit-item">
                            <div className="benefit-icon">✓</div>
                            <div className="benefit-text">
                                <strong>AI-Powered Analysis</strong>
                                <span>3 months free access to our complete AI scansion tool</span>
                            </div>
                        </div>

                        <div className="benefit-item">
                            <div className="benefit-icon">✓</div>
                            <div className="benefit-text">
                                <strong>Expert Community</strong>
                                <span>Connect with fellow poets passionate about metrical craft</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pricing-container">
                    <div className="pricing-badge">Limited Time</div>
                    <div className="pricing-details">
                        <div className="pricing-title">Founding Member Pre-Launch Price</div>
                        <div className="price">$99</div>
                        <div className="price-note">Regular price will be $149 after launch</div>
                    </div>
                </div>

                <button className="signup-button" onClick={redirectToSignup}>
                    Secure Your Spot Now
                </button>

                <div className="availability-note">
                    Limited spots available for our May 2025 founding cohort
                </div>
            </div>
        </div>
    );
};

export default PoetcraftPromo;
