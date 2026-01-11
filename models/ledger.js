const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  technician: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  commission: Number,
  type: { type: String, enum: ["credit", "debit"] },
  note: String
}, { timestamps: true });

module.exports = mongoose.model("Ledger", ledgerSchema);
