require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Admin.findOne({ email: "admin@servexa.com" });
    if (existing) {
      console.log("❗ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      name: "Super Admin",
      email: "admin@servexa.com",
      password: hashedPassword,
    });

    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
})();
