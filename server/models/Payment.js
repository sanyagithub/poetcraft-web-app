/**
 * BACKEND: models/Payment.js
 */
const mongoose = require("mongoose")

const PaymentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            ref: "User", // Reference to User model
        },
        purchasedCourses: [
            {
                type: String,
                enum: ["Anapestic", "Iambic", "Trochaic", "Dactylic"],
            },
        ],
        paymentDetails: {
            orderId: { type: String, required: true },
            amount: { type: Number, required: true },
            discountApplied: { type: Number, default: 0 },
            paymentStatus: {
                type: String,
                enum: ["pending", "completed", "failed"],
                default: "completed",
            },
        },
        customerEmail: { type: String, required: true },
        purchaseDate: { type: Date, default: Date.now },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Payment", PaymentSchema)
