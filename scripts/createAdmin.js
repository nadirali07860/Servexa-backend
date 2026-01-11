const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Admin = require("../models/adminModel");

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@example.com";
    const password = "admin123";

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
