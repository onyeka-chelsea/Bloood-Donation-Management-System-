const express = require ("express");
const router = express. Router;
const { protect, authorize } = require("../middleware/auth");
const {
listBloodBanks,
createBloodBank, 
updateStock, 
getLowStock,
} = require(".. /controllers/bloodBankController");
router.get("/", protect, listBloodBanks); router.get("/:id", protect, getBloodBank); router.post("/", protect, authorize("admin",
"hospital"), createBloodBank); router.put("/:id/stock", protect, authorize("admin", "hospital"), updateStock);
router.get("/:id/low-stock", protect, authorize("admin", "hospital"), getLowStock);
module. exports = router;
