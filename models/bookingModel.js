import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: "Technician", default: null },
    serviceType: String,
    address: String,
    slot: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);
