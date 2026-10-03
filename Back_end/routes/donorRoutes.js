const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
	getMyProfile,
	updateMyProfile,
	listDonors,
	recordDonation,
} = require("../controllers/donorController");

const router = express.Router();
router.get("/me", protect, authorize("donor"), getMyProfile);
router.put("/me", protect, authorize("donor"), updateMyProfile);
router.get("/", protect, authorize("admin", "hospital"), listDonors);
router.post("/:id/record-donation", protect, authorize("admin", "hospital"), recordDonation);

module.exports = router;