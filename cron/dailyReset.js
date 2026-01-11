const cron = require("node-cron");
const Technician = require("../models/technicianModel");

// 🔁 Run every day at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  try {
    const result = await Technician.updateMany(
      {},
      { $set: { dailyJobs: 0 } }
    );

    console.log("🌙 Daily reset done:", result.modifiedCount);
  } catch (err) {
    console.error("❌ Daily reset error:", err.message);
  }
});
