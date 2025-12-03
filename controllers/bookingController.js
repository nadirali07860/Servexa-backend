import Booking from "../models/bookingModel.js";
import Technician from "../models/technicianModel.js";

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const { customerId, serviceType, address, slot } = req.body;

    if (!customerId || !serviceType || !address || !slot) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const booking = await Booking.create({
      customer: customerId,
      serviceType,
      address,
      slot,
      status: "pending",
    });

    res.json({ message: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign Technician
export const assignTechnician = async (req, res) => {
  try {
    const { bookingId, technicianId } = req.body;

    const tech = await Technician.findById(technicianId);
    if (!tech) return res.json({ message: "Technician not found" });

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { technician: technicianId, status: "assigned" },
      { new: true }
    );

    res.json({ message: "Technician assigned", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Customer Bookings
export const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customer: req.params.customerId,
    }).populate("technician");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Technician Bookings
export const getTechnicianBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      technician: req.params.techId,
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
