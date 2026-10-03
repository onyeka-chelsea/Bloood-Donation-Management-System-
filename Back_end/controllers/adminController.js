const User = require("../models/Usermodel");
const Donation = require("../models/Donation");
const BloodRequest = require("../models/bloodRequest");

async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
}

async function getSystemStats(req, res) {
  try {
    const [totalUsers, totalDonors, totalHospitals, totalDonations, totalRequests] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: "donor" }),
        User.countDocuments({ role: "hospital" }),
        Donation.countDocuments({ status: "Donated" }),
        BloodRequest.countDocuments(),
      ]);

    return res.json({ totalUsers, totalDonors, totalHospitals, totalDonations, totalRequests });
  } catch (error) {
    console.error("Failed to fetch system stats:", error);
    return res.status(500).json({ message: "Failed to fetch system stats" });
  }
}

module.exports = { getAllUsers, getSystemStats };