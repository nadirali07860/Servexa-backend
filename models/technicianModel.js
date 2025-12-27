const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },

    // Technician main skills (AC, Plumbing, Painting...)
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
      }
    ],

    // Sub skills (Gas Filling, RO Installation...)
    subSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubService",
        required: false,
      }
    ],

    // Technician online/offline
    isOnline: {
      type: Boolean,
      default: true,
    },

    // Job lene ke liye free hai ya busy
    isAvailable: {
      type: Boolean,
      default: true,
    },

    // Ek din me max kitni jobs handle kar sakta
    dailyJobLimit: {
      type: Number,
      default: 3,
    },

    jobsCompletedToday: {
      type: Number,
      default: 0,
    },

    currentJob: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      default: null,
    },

    rating: {
      type: Number,
      default: 5,
    },

    experience: {
      type: Number,
      default: 1,
    },

    commissionRate: {
      type: Number,
      default: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Technician", technicianSchema);
