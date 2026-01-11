const Job = require("../models/jobModel");

exports.createBooking = async (req, res) => {
  try {
    const booking = req.body;

    // Auto create job
    const job = await Job.create({
      booking: booking._id || null,
      customer: booking.customer,
      serviceType: booking.serviceType,
      description: booking.description,
      price: booking.price,
      status: "pending"
    });

    res.json({
      message: "Booking created & Job generated",
      job
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
