import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  admissionNumber: { type: Number, unique: true },
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  class: { type: String, required: true },
  parentName: { type: String },
  parentContact: { type: String }
});

export default mongoose.model("Student", studentSchema);
