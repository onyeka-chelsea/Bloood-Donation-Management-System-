const express = require ("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { myNotifications, markRead,markAllRead } = 
require("../controllers/notificationController");
router.get("/me", protect, myNotifications);
router.put("/:id/read", protect, markRead) ; router.put ("/read-all" , protect,markAllRead) ;
module.exports = router;
