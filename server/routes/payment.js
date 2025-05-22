/**
 * BACKEND: routes/payment.js
 */
const express = require("express")
const router = express.Router()
const Payment = require("../models/Payment")
const User = require("../models/User")

// Handle payment success and store payment details
router.post("/payment-success", async (req, res) => {
    try {
        const { customerName, customerEmail, purchasedItems, totalAmount, orderId, discountApplied = 0 } = req.body

        // Extract username from email (part before @)
        const username = customerEmail

        // Check if user exists, if not create a basic user entry
        let user = await User.findOne({ username })

        if (!user) {
            // Create a basic user entry with just the username
            user = new User({
                username,
                password: Math.random().toString(36).slice(-8), // Temporary password, should be changed later
            })
            await user.save()
        }

        // Create a new payment record
        const newPayment = new Payment({
            username: user.username,
            purchasedCourses: purchasedItems.map((item) => item.split(" ")[0]), // Extract course type (e.g., "Anapestic" from "Anapestic Meter")
            paymentDetails: {
                orderId,
                amount: totalAmount,
                discountApplied,
                paymentStatus: "completed",
            },
            customerEmail,
            purchaseDate: new Date(),
        })

        await newPayment.save()

        // Return success response
        res.status(201).json({
            success: true,
            message: "Payment recorded successfully",
            paymentId: newPayment._id,
        })
    } catch (error) {
        console.error("Error recording payment:", error)
        res.status(500).json({
            success: false,
            message: "Error recording payment",
            error: error.message,
        })
    }
})

// Get all payments for a specific user
router.get("/payment/user-payments/:username", async (req, res) => {
    try {
        const { username } = req.params

        // Find all payments for this username
        const payments = await Payment.find({ username }).sort({ purchaseDate: -1 })

        res.status(200).json({
            success: true,
            payments,
        })
    } catch (error) {
        console.error("Error fetching user payments:", error)
        res.status(500).json({
            success: false,
            message: "Error fetching user payments",
            error: error.message,
        })
    }
})

// Get all payments (admin route)
router.get("/payment/all-payments", async (req, res) => {
    try {
        // This should be protected with admin authentication in production
        const payments = await Payment.find().sort({ purchaseDate: -1 })

        res.status(200).json({
            success: true,
            payments,
        })
    } catch (error) {
        console.error("Error fetching all payments:", error)
        res.status(500).json({
            success: false,
            message: "Error fetching all payments",
            error: error.message,
        })
    }
})

module.exports = router
