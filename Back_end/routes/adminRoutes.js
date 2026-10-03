const express = require("express");
const { getAllUsers, getSystemStats } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect, authorize("admin"));
router.get("/users", getAllUsers);
router.get("/stats", getSystemStats);

module.exports = router;