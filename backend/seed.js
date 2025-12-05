import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.log(err));

// Seed users
const seedUsers = async () => {
  try {
    // Remove existing users (optional)
    await User.deleteMany({});

    // Create hashed passwords
    const hashedPassword = await bcrypt.hash("123456", 10); // same password for all test users

    const users = [
      { username: "teacher1", password: hashedPassword, role: "teacher" },
      { username: "parent1", password: hashedPassword, role: "parent" },
      { username: "admin1", password: hashedPassword, role: "admin" },
    ];

    await User.insertMany(users);
    console.log("Users seeded successfully");
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
    mongoose.connection.close();
  }
};

seedUsers();
