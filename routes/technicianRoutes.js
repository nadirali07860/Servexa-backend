import express from "express";
import {
  registerTechnician,
  loginTechnician,
  getTechnicianProfile,
  updateTechnician
} from "../controllers/technicianController.js";

const router = express.Router();

// Technician Register
router.post("/register", registerTechnician);

// Technician Login
router.post("/login", loginTechnician);

// Technician Profile
router.get("/profile", getTechnicianProfile);

// Update Technician
router.put("/update", updateTechnician);

export default router;
