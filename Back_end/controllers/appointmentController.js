const Appointment = require("../models/Appointment");
const Notification = require("../models/Notification");
// @route POST /api/appointments (donorbooks a slot)
// body: { bloodBank, date, relatedRequest,notes }
async function createAppointment (req, res) {
const { bloodBank, date, relatedRequest, notes } = req.body;
if (!bloodBank || !date) {
return res. status (400).json({ message:"bloodBank and date are required" });
}
const appointment = await
Appointment.create({
donor: req.user._id, 
bloodBank, 
date,
relatedRequest: relatedRequest || null, 
notes,
}) ;
await Notification.create({
user: req.user._id, 
type: "appointment_reminder",
title: "Appointment booked",
message: `Your donation appointment is scheduled for ${new Date(date).toLocaleString()}.`,
}) ;
return res.status (201). json(appointment);
}

// @route GET /api/appointments/my (donor: own appointments)
async function myAppointments(req, res) {
const appointments = await Appointment.find({ donor: req.user._id })
.populate("bloodBank", "name location")
.sort({ date: 1 });
return res.json(appointments);
}


// @route GET /api/appointments (admin/hospital: all appointments, optionally by blood bank)
async function listAppointments(req, res) {
const { bloodBank, status } = req. query;
const query = {};
if (bloodBank) query.bloodBank =bloodBank;
if (status) query.status = status;

const appointments = await
Appointment. find (query)
.populate("donor", "name email phone")
.populate("bloodBank", "name location")
.sort({ date: 1 });
return res. json(appointments);
}

// @route PUT /api/appointments/:id/statusbody: { status }
async function updateAppointmentStatus(req,res) {
const { status } = req.body;
if (!["scheduled", "completed", "cancelled", "no_show"].includes(status)) {
return res.status(400).json({ message: "Invalid appointment status" });
}
const appointment = await
Appointment.findById(req.params.id);
if (!appointment) return
res. status (404).json({ message: "Appointment not found" }) ;
appointment. status = status;
await appointment. save();
// If the donation was completed, updatethe donor's history/eligibility
if (status === "completed") {
const DonorProfile = require("../models/DonorProfile");
const profile = await
DonorProfile. findOne({ user: appointment.donor });
if (profile) {
profile.lastDonationDate = new Date();
profile.totalDonations += 1; 
await profile.save();
}
}
return res.json(appointment);
}
module. exports = { createAppointment, myAppointments, listAppointments, updateAppointmentStatus };