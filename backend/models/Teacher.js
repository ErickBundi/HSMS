import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  idNumber: { type: String, required: true },
  tscNumber: { type: String, required: true },
  subjects: { type: [String], required: true } // array of subjects
});

export default mongoose.model("Teacher", teacherSchema);
