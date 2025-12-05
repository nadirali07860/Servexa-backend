import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    technicianId: { type: mongoose.Schema.Types.ObjectId, ref: "Technician" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "assigned" },
    startTime: Date,
    endTime: Date,
    remarks: String,
    amount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Job ||
  mongoose.model("Job", jobSchema);
