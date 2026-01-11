const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

/* ==========================
   DATABASE
========================== */
require("./config/db");

/* ==========================
   MIDDLEWARES
========================== */
app.use(cors());
app.use(express.json());

/* ==========================
   ROUTE IMPORTS
========================== */

// AUTH
const authRoutes = require("./routes/authRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const customerAuthRoutes = require("./routes/customerAuthRoutes");
const technicianAuthRoutes = require("./routes/technicianAuthRoutes");

// USERS
const customerRoutes = require("./routes/customerRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const adminRoutes = require("./routes/adminRoutes");

// JOB / BOOKING
const jobRoutes = require("./routes/jobRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const assignRoutes = require("./routes/assignRoutes");

// CATALOG
const categoryRoutes = require("./routes/categoryRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const subServiceRoutes = require("./routes/subServiceRoutes");

// EXTRA
const ratingRoutes = require("./routes/ratingRoutes");

/* ==========================
   ROUTE MOUNTS
========================== */

// AUTH
app.use("/api/auth", authRoutes);
app.use("/api/auth/admin", adminAuthRoutes);
app.use("/api/auth/customer", customerAuthRoutes);
app.use("/api/auth/technician", technicianAuthRoutes);

// USERS
app.use("/api/customer", customerRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/admin", adminRoutes);

// JOB / BOOKING
app.use("/api/job", jobRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/assign", assignRoutes);

// CATALOG
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/sub-services", subServiceRoutes);

// EXTRA
app.use("/api/ratings", ratingRoutes);

/* ==========================
   TEST ROUTE
========================== */
app.get("/", (req, res) => {
  res.send("Servexa API is running");
});

/* ==========================
   GLOBAL ERROR HANDLER
========================== */
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

/* ==========================
   SERVER START
========================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
