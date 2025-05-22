"use client"

import { useState, useEffect } from "react"
import { PayPalButtons } from "@paypal/react-paypal-js"
import "./style/PaymentPage.css"
import SuccessPage from "./SuccessPage";

const PaymentPage = () => {
    const [selectedOptions, setSelectedOptions] = useState({
        anapestic: false,
        iambic: false,
        trochaic: false,
        dactylic: false,
    })

    const [total, setTotal] = useState(0)
    const [discountCode, setDiscountCode] = useState("")
    const [appliedDiscount, setAppliedDiscount] = useState(0)
    const [discountMessage, setDiscountMessage] = useState("")
    const [isDiscountApplied, setIsDiscountApplied] = useState(false)
    const [showSuccessPage, setShowSuccessPage] = useState(false)
    const [purchaseDetails, setPurchaseDetails] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const PRICE_PER_OPTION = 33.33

    useEffect(() => {
        const selectedCount = Object.values(selectedOptions).filter(Boolean).length
        const subtotal = selectedCount * PRICE_PER_OPTION
        setTotal(Math.max(0, subtotal - appliedDiscount))
    }, [selectedOptions, appliedDiscount])

    const applyDiscountCode = () => {
        if (discountCode.toUpperCase() === "NAPOWRIMO") {
            setAppliedDiscount(33.33)
            setDiscountMessage("Discount applied: $33.33 off!")
            setIsDiscountApplied(true)
        } else {
            setAppliedDiscount(0)
            setDiscountMessage("Invalid discount code")
            setIsDiscountApplied(false)
        }
    }

    const savePaymentToDatabase = async (paymentData) => {
        try {
            setIsProcessing(true)
            console.log(paymentData)

            const response = await fetch("/api/payment/payment-success", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...paymentData,
                    discountApplied: appliedDiscount,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Error saving payment data")
            }

            setIsProcessing(false)
            return true
        } catch (error) {
            console.error("Error saving payment data:", error)
            setErrorMessage(
                `There was an error recording your payment: ${error.message}. Don't worry, your payment was successful and our team will contact you.`,
            )
            setIsProcessing(false)
            return false
        }
    }
    const handleCheckboxChange = (option) => {
        setSelectedOptions({
            ...selectedOptions,
            [option]: !selectedOptions[option],
        })
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total.toFixed(2),
                        currency_code: "USD",
                    },
                    description: `Poetcraft Learning: ${Object.entries(selectedOptions)
                        .filter(([_, isSelected]) => isSelected)
                        .map(([option]) => option.charAt(0).toUpperCase() + option.slice(1))
                        .join(", ")} Meter`,
                },
            ],
        })
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            // Create purchase details object
            const purchasedItems = Object.entries(selectedOptions)
                .filter(([_, isSelected]) => isSelected)
                .map(([option]) => {
                    const formattedOption = option.charAt(0).toUpperCase() + option.slice(1)
                    return `${formattedOption} Meter`
                })

            const paymentData = {
                customerName: details.payer.name.given_name + " " + details.payer.name.surname,
                customerEmail: details.payer.email_address,
                purchasedItems: purchasedItems,
                totalAmount: Number.parseFloat(total.toFixed(2)),
                orderId: details.id,
                purchaseDate: new Date().toISOString(),
            }

            // Save payment data to database
            await savePaymentToDatabase(paymentData)

            // Set purchase details for success page
            setPurchaseDetails({
                ...paymentData,
                purchaseDate: new Date().toLocaleDateString(),
            })

            // Show success page
            setShowSuccessPage(true)

            // Scroll to top of page
            window.scrollTo(0, 0)
        })
    }

    if (showSuccessPage && purchaseDetails) {
        return <SuccessPage purchaseDetails={purchaseDetails} isProcessing={isProcessing} errorMessage={errorMessage} />
    }

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
                    <section className="payment-section">
                        <h2 className="journey-title">Select Your Poetry Learning Path</h2>

                        <div className="payment-card">
                            <div className="decorative-element leaf-top"></div>
                            <div className="decorative-element leaf-bottom"></div>
                            <div className="decorative-element spiral-left"></div>
                            <div className="decorative-element spiral-right"></div>

                            <div className="options-container">
                                <div className="option-item">
                                    <input
                                        type="checkbox"
                                        id="anapestic"
                                        checked={selectedOptions.anapestic}
                                        onChange={() => handleCheckboxChange("anapestic")}
                                    />
                                    <label htmlFor="anapestic">Learn Anapestic Meter</label>
                                    <span className="option-price">${PRICE_PER_OPTION.toFixed(2)}</span>
                                </div>

                                <div className="option-item">
                                    <input
                                        type="checkbox"
                                        id="iambic"
                                        checked={selectedOptions.iambic}
                                        onChange={() => handleCheckboxChange("iambic")}
                                    />
                                    <label htmlFor="iambic">Learn Iambic Meter</label>
                                    <span className="option-price">${PRICE_PER_OPTION.toFixed(2)}</span>
                                </div>

                                <div className="option-item">
                                    <input
                                        type="checkbox"
                                        id="trochaic"
                                        checked={selectedOptions.trochaic}
                                        onChange={() => handleCheckboxChange("trochaic")}
                                    />
                                    <label htmlFor="trochaic">Learn Trochaic Meter</label>
                                    <span className="option-price">${PRICE_PER_OPTION.toFixed(2)}</span>
                                </div>

                                <div className="option-item">
                                    <input
                                        type="checkbox"
                                        id="dactylic"
                                        checked={selectedOptions.dactylic}
                                        onChange={() => handleCheckboxChange("dactylic")}
                                    />
                                    <label htmlFor="dactylic">Learn Dactylic Meter</label>
                                    <span className="option-price">${PRICE_PER_OPTION.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="discount-container">
                                <h3>Have a discount code?</h3>
                                <div className="discount-input-group">
                                    <input
                                        type="text"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        placeholder="Enter discount code"
                                        className="discount-input"
                                    />
                                    <button onClick={applyDiscountCode} className="discount-button" type="button">
                                        Apply
                                    </button>
                                </div>
                                {discountMessage && (
                                    <p className={`discount-message ${isDiscountApplied ? "success" : "error"}`}>{discountMessage}</p>
                                )}
                            </div>

                            <div className="total-container">
                                <h3>
                                    Total: <span className="total-amount">${total.toFixed(2)}</span>
                                </h3>
                                {appliedDiscount > 0 && (
                                    <div className="discount-applied">
                                        <p>
                                            Discount applied: <span className="discount-amount">-${appliedDiscount.toFixed(2)}</span>
                                        </p>
                                    </div>
                                )}
                                <p className="selection-summary">
                                    {Object.values(selectedOptions).filter(Boolean).length === 0
                                        ? "Select at least one option to continue"
                                        : `You've selected ${Object.values(selectedOptions).filter(Boolean).length} learning path${Object.values(selectedOptions).filter(Boolean).length > 1 ? "s" : ""}`}
                                </p>
                            </div>

                            <div className="paypal-container">
                                {total > 0 && (
                                    <PayPalButtons
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        onError={(err) => {
                                            console.error("PayPal error:", err);
                                            alert("Something went wrong. Check console.");
                                        }}
                                        style={{
                                            layout: "vertical",
                                            color: "gold",
                                            shape: "rect",
                                            label: "pay",
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </section>

                    {/*<section className="benefits-section">*/}
                    {/*    <h2 className="journey-title">Why Learn with Poetcraft?</h2>*/}

                    {/*    <div className="steps-container">*/}
                    {/*        <div className="step-card">*/}
                    {/*            <div className="step-number">1</div>*/}
                    {/*            <h3>Expert Guidance</h3>*/}
                    {/*            <p>Learn from poetry experts with years of teaching experience.</p>*/}
                    {/*        </div>*/}

                    {/*        <div className="step-card">*/}
                    {/*            <div className="step-number">2</div>*/}
                    {/*            <h3>Interactive Exercises</h3>*/}
                    {/*            <p>Practice with real-time feedback to master each meter.</p>*/}
                    {/*        </div>*/}

                    {/*        <div className="step-card">*/}
                    {/*            <div className="step-number">3</div>*/}
                    {/*            <h3>Lifetime Access</h3>*/}
                    {/*            <p>Return to your learning materials whenever you need a refresher.</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</section>*/}
                </main>
            </div>
        </div>
    )
}

export default PaymentPage
