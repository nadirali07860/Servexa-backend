import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },

    serviceType: { type: String, required: true }, // AC Repair, Plumber etc.
    issueDescription: { type: String, required: true },

    technicianId: { type: mongoose.Schema.Types.ObjectId, ref: "Technician", default: null },

    status: {
      type: String,
      enum: ["Pending", "Assigned", "Accepted", "OnTheWay", "Started", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
