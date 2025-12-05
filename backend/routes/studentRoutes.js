console.log("studentRoutes LOADED!");


import express from "express";
import Student from "../models/Student.js";
import Counter from "../models/Counter.js";

const router = express.Router();

const getNextAdmissionNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "student_admission" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};

router.post("/register-student", async (req, res) => {
  try {
    const { fullName, dob, class: className, parentName, parentContact } = req.body;

    const admissionNumber = await getNextAdmissionNumber();

    const student = new Student({ admissionNumber, fullName, dob, class: className, parentName, parentContact });
    await student.save();

    res.status(201).json({ message: "Student registered successfully", admissionNumber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register student" });
  }
});

router.get("/next-admission-number", async (req, res) => {
  try {
    const counter = await Counter.findOne({ name: "student_admission" });

    res.json({
      nextAdmissionNumber: counter ? counter.seq + 1 : 1
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch admission number" });
  }
});


export default router;
