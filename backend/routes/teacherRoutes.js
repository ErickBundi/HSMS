console.log("teacherRoutes LOADED!");


import express from "express";
import Teacher from "../models/Teacher.js";

const router = express.Router();

router.post("/register-teacher", async (req, res) => {
  try {
    const { fullName, dob, idNumber, tscNumber, subjects } = req.body;

    const teacher = new Teacher({ fullName, dob, idNumber, tscNumber, subjects });
    await teacher.save();

    res.status(201).json({ message: "Teacher registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register teacher" });
  }
});

export default router;
