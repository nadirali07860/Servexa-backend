import Booking from "../models/Booking.js";
import Technician from "../models/Technician.js";
import Job from "../models/Job.js";

// =========================
// Create Booking (Customer)
// =========================
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({
      message: "Booking Created",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

// =========================
// Approve Booking (Admin)
// Auto Assign Technician + Create Job
// =========================
export const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ message: "Booking Not Found" });

    // Find technician by skill
    const tech = await Technician.findOne({ skill: booking.serviceType });
    if (!tech)
      return res.status(404).json({ message: "No Technician Available" });

    // Approve booking
    booking.status = "approved";
    await booking.save();

    // Create job auto
    const job = await Job.create({
      customerId: booking.customer,
      technicianId: tech._id,
      bookingId: booking._id,
      status: "assigned",
    });

    res.json({
      message: "Booking Approved & Job Created",
      booking,
      technician: tech,
      job,
    });

  } catch (error) {
    res.status(500).json({ message: "Error approving booking", error });
  }
};

// =========================
// Get bookings by customer
// =========================
export const getBookingsByCustomer = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.params.id })
      .populate("technician")
      .populate("customer");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching customer bookings",
      error,
    });
  }
};
