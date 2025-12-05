// server.js (fixed)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  console.log("Login attempt:", req.body);

  try {
    const user = await User.findOne({ username, role });
    console.log("User found in DB:", user);

    if (!user) {
      console.log("No user matched the credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Password did not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Login successful for user:", user.username);
    res.json({ username: user.username, role: user.role });
  } catch (err) {
    console.error("Server error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Student & teacher route files ---
// studentRoutes handles /register-student (and any other student routes)
app.use("/api/admin/students", studentRoutes);
// teacherRoutes handles /register-teacher (and any other teacher routes)
app.use("/api/admin/teachers", teacherRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
