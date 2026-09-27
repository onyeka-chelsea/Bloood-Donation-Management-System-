const express = require ("express");
const router = express. Router;
const { protect, authorize } = require("../middleware/auth");
const {
getMyProfile,
updateMyProfile, 
listDonors, 
recordDonation,
} = require("../controllers/donorController");
router.get("/me", protect,
authorize("donor"), getMyProfile);
router.put("/me", protect,
authorize("donor"), updateMyProfile);
router.get("/", protect, authorize("admin",
"hospital"), listDonors);
router. post("/:id/record-donation", protect, authorize("admin", "hospital"), recordDonation);
module. exports = router;