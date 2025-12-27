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

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    subService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubService",
      default: null,
    },

    price: {
      type: Number,
      required: true,
    },

    address: {
      line1: { type: String, required: true },
      line2: { type: String, default: "" },
      landmark: { type: String, default: "" },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      geo: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "auto-assigned",
        "accepted",
        "on_the_way",
        "in-progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },

    paymentMode: {
      type: String,
      enum: ["cash", "online", "wallet"],
      default: "cash",
    },

    customerMaskedPhone: {
      type: String,
      default: "",
    },

    technicianMaskedPhone: {
      type: String,
      default: "",
    },

    autoAssignAttempts: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
