const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    basePrice: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    finalPrice: {
      type: Number,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto calculate finalPrice
serviceSchema.pre("save", function (next) {
  const discountAmount = (this.basePrice * this.discount) / 100;
  this.finalPrice = this.basePrice - discountAmount;
  next();
});

module.exports = mongoose.model("Service", serviceSchema);
