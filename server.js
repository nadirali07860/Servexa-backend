import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import technicianRoutes from "./routes/technicianRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("DB Error:", err.message || err);
    process.exit(1);
  });

// Basic Route
app.get("/", (req, res) => {
  res.json({ message: "Server is up" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/customer", customerRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
