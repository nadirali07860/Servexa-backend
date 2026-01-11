const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

// CREATE BOOKING
router.post("/", bookingController.createBooking);

// GET ALL BOOKINGS
router.get("/", bookingController.getAllBookings);

// GET BOOKING BY ID
router.get("/:id", bookingController.getBookingById);

module.exports = router;
