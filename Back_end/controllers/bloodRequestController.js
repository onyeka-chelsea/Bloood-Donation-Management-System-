const BloodRequest = require("../models/bloodRequest");
const DonorProfile = require("../models/Donormodel");

const URGENCY_MAP = {
	Routine: "low",
	Urgent: "high",
	Critical: "critical",
	low: "low",
	medium: "medium",
	high: "high",
	critical: "critical",
};

const DISPLAY_URGENCY = {
	low: "Routine",
	medium: "Routine",
	high: "Urgent",
	critical: "Critical",
};
// @route POST /api/requests (hospital/admin)
// body: { bloodType, units, urgency, reason, location }
async function createRequest(req, res) {
try {
const { bloodType, location, bloodBank } = req.body;
const unitsNeeded = Number(req.body.unitsNeeded ?? req.body.units);
const urgency = URGENCY_MAP[req.body.urgency] || "medium";
const patientInfo = req.body.patientInfo ?? req.body.reason;
const requestLocation = location || req.user.location || req.user.organizationName || req.user.name;
if (!bloodType || !Number.isInteger(unitsNeeded) || unitsNeeded < 1 || !requestLocation) {
return res.status(400).json({ message:"Blood type, valid units and location are required" });
}
const request = await
BloodRequest.create({
requestedBy: req.user._id,
bloodBank: bloodBank || undefined, 
bloodType, 
unitsNeeded,
urgency,
patientInfo, 
location: requestLocation,
}) ;
return res.status(201).json({ request, donorsNotified: 0 });
} catch (err) {
console.error (err);
return res. status (500).json({ message:"Server error creating request" });
}
}


// @route GET /api/requests
async function listRequests (req, res) {
const { status, bloodType } = req. query;
const query = {};
if (status) query.status = status;
if (bloodType) query.bloodType =bloodType;

const requests = await
BloodRequest.find(query)
.populate("requestedBy", "name organizationName location")
.populate("bloodBank", "name location")
.sort({ createdAt: -1 });
return res. json(requests);
}

async function listMyRequests(req, res) {
const requests = await BloodRequest.find({ requestedBy: req.user._id }).sort({ createdAt: -1 });
return res.json(requests.map((request) => ({
id: request._id,
bloodType: request.bloodType,
units: request.unitsNeeded,
urgency: DISPLAY_URGENCY[request.urgency] || "Routine",
createdAt: request.createdAt,
status: request.status,
})));
}

// @route GET /api/requests/matches-for-me(donor: requests compatible with my blood type)
async function myMatches (req, res) {
const profile = await
DonorProfile.findOne({ user: req.user._id });
if (!profile) return
res. status (404).json({ message: "Complete your donor profile first" });
const compatibleTypes = BloodRequest.compatibleDonorBloodTypes(profile.bloodType);
const requests = await BloodRequest. find({
 bloodType: { $in: compatibleTypes },
status: { $in: ["open", "partially_fulfilled"] },
})
.populate ("requestedBy", "name organizationName location")
.sort ({ urgency: -1, createdAt: -1 });
return res.json(requests);
}


// @route PUT /api/requests/:id/statusbody: { status }
async function updateStatus (req, res) {
const { status } = req. body;
if (!["open", "partially_fulfilled", "fulfilled", "cancelled"].includes(status)) {
return res.status(400).json({ message: "Invalid request status" });
}
const request = await
BloodRequest.findById(req.params.id);
if (!request) return
res. status (404). json({ message: "Request not found" });
request.status = status;
await request.save();

// If fulfilled and tied to a blood bank,this does NOT auto-adjust stock;
// stock changes go through the blood bankinventory endpoints so hospitals
// keep an accurate physical count.

return res.json(request);
}
module.exports = { createRequest, listRequests, listMyRequests, myMatches, updateStatus };