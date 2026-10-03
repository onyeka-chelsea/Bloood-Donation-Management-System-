const express = require("express");
const {
  bookDonation,
  getDonationHistory,
  getAllDonations,
  completeDonation,
} = require("../controllers/donationController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/book", protect, authorize("donor"), bookDonation);
router.get("/history", protect, authorize("donor"), getDonationHistory);
router.get("/", protect, authorize("bloodbank", "admin"), getAllDonations);
router.put("/:id/complete", protect, authorize("bloodbank", "admin"), completeDonation);

module.exports = router;