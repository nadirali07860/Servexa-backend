import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    skill: String,
  },
  { timestamps: true }
);

export default mongoose.models.Technician ||
  mongoose.model("Technician", technicianSchema);
