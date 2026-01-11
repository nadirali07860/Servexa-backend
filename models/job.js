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

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    note: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "assigned", "accepted", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
