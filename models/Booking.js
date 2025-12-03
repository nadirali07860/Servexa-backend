import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },

    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technician",
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "assigned", "accepted", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
