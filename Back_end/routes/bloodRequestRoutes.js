const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
	createRequest,
	listRequests,
	listMyRequests,
	myMatches,
	updateStatus,
} = require("../controllers/bloodRequestController");

const router = express.Router();
router.post("/", protect, authorize("admin", "hospital"), createRequest);
router.get("/mine", protect, authorize("hospital", "admin"), listMyRequests);
router.get("/", protect, listRequests);
router.get("/matches-for-me", protect, authorize("donor"), myMatches);
router.put("/:id/status", protect, authorize("admin", "hospital"), updateStatus);

module.exports = router;
