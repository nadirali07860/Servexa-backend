const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/adminModel");
require("./config/db");

(async () => {
  try {
    const existing = await Admin.findOne({ email: "admin@test.com" });
    if (existing) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await Admin.create({
      name: "Super Admin",
      email: "admin@test.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
