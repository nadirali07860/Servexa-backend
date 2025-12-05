import express from "express";
import { 
  approveBooking,
  createBooking,
  getBookingsByCustomer
} from "../controllers/bookingController.js";

const router = express.Router();

// Create Booking
router.post("/create", createBooking);

// Approve Booking
router.post("/approve/:id", approveBooking);

// Get Bookings by Customer
router.get("/customer/:id", getBookingsByCustomer);

export default router;
