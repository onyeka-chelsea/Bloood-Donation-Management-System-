const express = require("express");
const { getInventory, updateInventory } = require("../controllers/inventoryController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", protect, authorize("bloodbank", "admin", "hospital"), getInventory);
router.put("/:id", protect, authorize("bloodbank", "admin", "hospital"), updateInventory);

module.exports = router;