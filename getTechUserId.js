require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.findOne({
      phone: "9999999999",
      role: "technician",
    });

    if (!user) {
      console.log("❌ Technician user not found");
    } else {
      console.log("✅ Technician User ID:", user._id.toString());
    }

    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();
