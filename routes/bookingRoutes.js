const express = require("express");
const router = express.Router();

const { createBooking, getBookings } = require("../controllers/bookingController");
const auth = require("../middleware/authMiddleware");

router.post("/create", auth, createBooking);
router.get("/my-bookings", auth, getBookings);

module.exports = router;
