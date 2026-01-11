const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: String,
    phone: String,
    email: String,

    isActive: {
      type: Boolean,
      default: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    currentJob: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      default: null,
    },

    lastAssignedAt: {
      type: Date,
      default: new Date(0),
    },

    // ⭐⭐⭐ RATING SYSTEM (STEP 6.2)
    averageRating: {
      type: Number,
      default: 0,
    },

    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ⚡ AUTO ASSIGN INDEX
technicianSchema.index({
  isAvailable: 1,
  currentJob: 1,
  lastAssignedAt: 1,
});

module.exports = mongoose.model("Technician", technicianSchema);
