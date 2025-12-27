const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: "Technician", default: null },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    date: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["pending", "assigned", "completed", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
