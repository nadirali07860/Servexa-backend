const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/user");
const Technician = require("./models/technicianModel");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const user = await User.findOne({
    phone: "9999999999",
    role: "technician",
  });

  if (!user) {
    console.log("❌ User not found");
    process.exit();
  }

  const exists = await Technician.findOne({ user: user._id });
  if (exists) {
    console.log("ℹ️ Technician profile already exists");
    process.exit();
  }

  const tech = await Technician.create({
    user: user._id,
    name: user.name || "Test Technician",
    phone: user.phone,
  });

  console.log("✅ Technician profile CREATED:", tech._id);
  process.exit();
})();
