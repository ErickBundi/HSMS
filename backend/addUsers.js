const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection string - REPLACE with your actual connection string
const MONGODB_URI = 'mongodb://bundinyaga:NJgD!yxqq)K2sxG@ac-3dttodz-shard-00-00.ezvhpnb.mongodb.net:27017,ac-3dttodz-shard-00-01.ezvhpnb.mongodb.net:27017,ac-3dttodz-shard-00-02.ezvhpnb.mongodb.net:27017/hsms?ssl=true&replicaSet=atlas-bw0z3w-shard-0&authSource=admin&appName=hsms-cluster';

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'parent', 'admin'], required: true }
});

const User = mongoose.model('User', userSchema, 'users');

// Function to hash password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Function to add a single user
async function addUser(username, password, role) {
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      role
    });
    await newUser.save();
    console.log(`✓ User '${username}' added successfully with role '${role}'`);
    return newUser;
  } catch (error) {
    console.error(`✗ Error adding user '${username}':`, error.message);
  }
}

// Function to add multiple users at once
async function addMultipleUsers(users) {
  for (const user of users) {
    await addUser(user.username, user.password, user.role);
  }
}

// Main function
async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Define users to add
    const newUsers = [
      { username: 'student2', password: 'password123', role: 'student' },
      { username: 'teacher2', password: 'password123', role: 'teacher' },
      { username: 'parent2', password: 'password123', role: 'parent' },
      // Add more users here as needed
    ];

    // Add all users
    await addMultipleUsers(newUsers);

    console.log('\nAll users added successfully!');
  } catch (error) {
    console.error('Connection error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
main();
