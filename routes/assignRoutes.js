import express from "express";
import { autoAssignTechnician } from "../controllers/assignController.js";

const router = express.Router();

// UrbanClap-style auto assignment
router.get("/auto-assign/:id", autoAssignTechnician);

export default router;
