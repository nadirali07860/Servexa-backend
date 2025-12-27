const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String }, 
    description: { type: String },
    basePrice: { type: Number, default: 0 },
    subServices: [
      {
        title: String,
        price: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
