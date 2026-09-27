const express = require ("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
createAppointment, myAppointments, listAppointments, updateAppointmentStatus,
} = require("../controllers/appointmentController");
router.post("/", protect,authorize("donor"), createAppointment);
router.get("/me", protect,authorize("donor"), myAppointments);
router.get("/", protect, authorize("admin","hospital"), listAppointments); 
router.put("/:id/status", protect, authorize("admin", "hospital"), updateAppointmentStatus);
module.exports = router;
