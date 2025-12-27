const mongoose = require("mongoose");

const subServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, default: "" },
    price: { type: Number, default: 0 },
    description: { type: String, default: "" },
    duration: { type: String, default: "" },  // Example: "45 min"
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }
}, { timestamps: true });

module.exports = mongoose.model("SubService", subServiceSchema);
