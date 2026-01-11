const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technician",
      default: null,
    },

    serviceType: String,
    price: Number,
    address: String,
    notes: String,

    status: {
      type: String,
      enum: ["pending", "assigned", "accepted", "completed"],
      default: "pending",
    },

    rejectedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technician",
      },
    ],

    assignedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
