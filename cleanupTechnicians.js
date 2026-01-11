require("dotenv").config();
const mongoose = require("mongoose");
const Technician = require("./models/technicianModel");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const result = await Technician.deleteMany({ email: null });
  console.log("Deleted technicians:", result.deletedCount);
  process.exit();
})();
