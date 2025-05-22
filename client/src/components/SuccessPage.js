"use client"
import "./style/SuccessPage.css"

const SuccessPage = ({ purchaseDetails, isProcessing, errorMessage }) => {
    return (
        <div className="landing-container">
            <div className="background-decoration wave-1"></div>
            <div className="background-decoration wave-2"></div>

            <div className="content-wrapper">
                <header className="landing-header">
                    <h1 className="brand-title">Poetcraft</h1>
                    <p className="expert-credit">Master the Art of Poetry</p>
                </header>

                <main className="landing-main">
                    <section className="success-section">
                        <div className="success-card">
                            <div className="decorative-element leaf-top"></div>
                            <div className="decorative-element leaf-bottom"></div>
                            <div className="decorative-element spiral-left"></div>
                            <div className="decorative-element spiral-right"></div>

                            <div className="success-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="64"
                                    height="64"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>

                            <h2 className="success-title">Payment Successful!</h2>
                            <p className="success-message">
                                Thank you for your purchase, {purchaseDetails.customerName}! Your order has been confirmed.
                            </p>

                            {isProcessing && (
                                <div className="processing-message">
                                    <div className="spinner"></div>
                                    <p>Processing your payment information...</p>
                                </div>
                            )}

                            {errorMessage && (
                                <div className="error-container">
                                    <p className="error-message">{errorMessage}</p>
                                </div>
                            )}

                            <div className="order-details">
                                <h3>Order Summary</h3>
                                <div className="order-items">
                                    {purchaseDetails.purchasedItems.map((item, index) => (
                                        <div className="order-item" key={index}>
                                            <span className="item-name">{item}</span>
                                            <span className="item-price">${PRICE_PER_OPTION.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-total">
                                    <span>Total</span>
                                    <span>${purchaseDetails.totalAmount}</span>
                                </div>
                                <div className="order-id">
                                    <span>Order ID:</span>
                                    <span>{purchaseDetails.orderId}</span>
                                </div>
                            </div>

                            <div className="next-steps">
                                <h3>What's Next?</h3>
                                <div className="next-steps-content">
                                    <div className="next-step">
                                        <div className="step-icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                        </div>
                                        <div className="step-content">
                                            <h4>Check Your Email</h4>
                                            <p>
                                                You will receive your login details within 48 hours from <strong>sanya@poetcraft.org</strong>.
                                                If you don't see it, please check your spam folder.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="next-step">
                                        <div className="step-icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                            </svg>
                                        </div>
                                        <div className="step-content">
                                            <h4>Prepare for Your Journey</h4>
                                            <p>
                                                Get ready to embark on your poetry learning journey. Your courses will be ready for you to
                                                access as soon as you receive your login details.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-info">
                                <h3>Questions?</h3>
                                <p>
                                    If you have any questions or need assistance, please contact us at{" "}
                                    <a href="mailto:info@poetcraft.org">info@poetcraft.org</a>
                                </p>
                            </div>

                            <button className="return-button" onClick={() => window.location.reload()}>
                                Return to Home
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

// Define the price per option constant here as well for consistency
const PRICE_PER_OPTION = 33.33

export default SuccessPage
