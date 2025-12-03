import express from "express";
import {
  createBooking,
  assignTechnician,
  getCustomerBookings,
  getTechnicianBookings
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", createBooking);
router.post("/assign", assignTechnician);
router.get("/customer/:customerId", getCustomerBookings);
router.get("/technician/:techId", getTechnicianBookings);

export default router;
