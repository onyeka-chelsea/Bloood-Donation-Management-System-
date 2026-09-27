const express = require ("express");
const router = express.Router();
const { protect, authorize } = require(" ../middleware/auth");
const {
createRequest, 
listRequests, 
myMatches, 
updateStatus,
} = require(" .. /controllers/requestController");
router.post("/", protect, authorize("admin",
"hospital"), createRequest);
router.get("/", protect, listRequests); router. get("/matches-for-me", protect,
authorize("donor"), myMatches);
router.put("/:id/status", protect, authorize("admin", "hospital"), updateStatus) ;
module. exports = router;
