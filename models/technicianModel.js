import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    skill: String,
    password: String
  },
  { timestamps: true }
);

export default mongoose.model("Technician", technicianSchema);
