require("dotenv").config();   // 🔴 YE LINE MISSING THI

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hash = await bcrypt.hash("tech1234", 10);

  const r = await User.updateOne(
    { phone: "9999999999", role: "technician" },
    { $set: { password: hash } }
  );

  console.log("UPDATED:", r);
  process.exit();
})();
