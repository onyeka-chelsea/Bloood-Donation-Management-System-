const jwt = require("jsonwebtoken");
const User = require("../models/Usermodel");

const DonorProfile = require("../models/Donormodel");

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

// @route POST /api/auth/register
// body: { name, email, password, phone, role, organizationName, location, ... }
async function register(req, res) {
  try {
    const { name, email, password, phone, role, organizationName, location } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const normalizedEmail = email.toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });

    if (existing) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    const allowedRoles = ["donor", "hospital", "bloodbank"];
    const userRole = allowedRoles.includes(role) ? role : "donor";

    if (userRole === "bloodbank" && !location) {
      return res.status(400).json({ message: "Location is required for blood bank accounts" });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      phone,
      role: userRole,
      organizationName,
      location,
    });

    if (userRole === "bloodbank") {
      const BloodBank = require("../models/Bloodbank");
      await BloodBank.create({ name, location, contactPhone: phone, managedBy: user._id });
    }

    return res.status(201).json({
      user: user.toSafeObject ? user.toSafeObject() : user,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error during registration" });
  }
}

// @route POST /api/auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "This account has been deactivated" });
    }

    return res.json({
      user: user.toSafeObject ? user.toSafeObject() : user,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error during login" });
  }
}

// @route GET /api/auth/me
async function getMe(req, res) {
  try {
    const profile =
      req.user && req.user.role === "donor" && DonorProfile
        ? await DonorProfile.findOne({ user: req.user._id })
        : null;

    return res.json({
      user: req.user && req.user.toSafeObject ? req.user.toSafeObject() : req.user,
      donorProfile: profile,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while fetching profile" });
  }
}

module.exports = { register, login, getMe };