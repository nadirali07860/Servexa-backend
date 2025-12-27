const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// =======================
// Middlewares
// =======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// Database Connection
// =======================
connectDB();

// =======================
// Health Check Route
// =======================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Servexa Backend is running 🚀",
  });
});

// =======================
// Routes
// =======================
const customerRoutes = require("./routes/customerRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const subServiceRoutes = require("./routes/subServiceRoutes");
const jobRoutes = require("./routes/jobRoutes");

// =======================
// Mount Routes
// =======================
app.use("/api/customers", customerRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/subservices", subServiceRoutes);
app.use("/api/jobs", jobRoutes);

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
