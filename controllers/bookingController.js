const Booking = require("../models/bookingModel");
const Job = require("../models/jobModel");

// Create booking
const createBooking = async (req, res) => {
    try {
        const { jobId, technicianId } = req.body;

        const booking = await Booking.create({
            customer: req.user.id,
            technician: technicianId,
            job: jobId,
        });

        res.json({ message: "Booking created", booking });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all bookings of customer
const getBookings = async (req, res) => {
    try {
        const data = await Booking.find({ customer: req.user.id })
            .populate("technician")
            .populate("job");

        res.json(data);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createBooking,
    getBookings
};
