require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/Usermodel");

async function makeAdmin() {
  const email = process.argv[2]?.trim().toLowerCase();

  if (!email) {
    console.error("Usage: npm run make-admin -- <email>");
    process.exitCode = 1;
    return;
  }

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in the backend .env file");
    process.exitCode = 1;
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email });

    if (!user) {
      console.error(`No account found for ${email}. Register that account first.`);
      process.exitCode = 1;
      return;
    }

    user.role = "admin";
    await user.save();
    console.log(`Admin access enabled for ${email}. Log out and back in to refresh the session.`);
  } catch (error) {
    console.error("Could not enable admin access:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

makeAdmin();