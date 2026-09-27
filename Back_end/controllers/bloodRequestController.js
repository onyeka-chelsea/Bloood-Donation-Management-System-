const BloodRequest = require("../models/bloodRequest");
const Notification = require("../models/Notification");
const BloodBank = require("../models/BloodBank");
const sendEmail = require("../utils/sendEmail");
const { findMatchingDonors } = require("../utils/matchDonors");
// @route POST /api/requests (hospital/admin)
// body: { bloodType, unitsNeeded, urgency,
patientInfo, location, bloodBank &
async function createRequest(req, res) {
try {
const { bloodType, unitsNeeded, urgency, patientInfo, location, bloodBank } = req. body;
if (!bloodType || !unitsNeeded || !location) {
return res.status (400).json({ message:"bloodType, unitsNeeded and location are required" });
}
const request = await
BloodRequest.create({
requestedBy: req.user._id,
bloodBank: bloodBank || undefined, 
bloodType, 
unitsNeeded,
urgency: urgency || "medium", 
patientInfo, 
location,
}) ;
// Immediately find and notify compatible, eeligible donors nearby

const matches = await
findMatchingDonors(bloodType, location);
const notifyIds = [];

for (const profile of matches) {
const donorUser = profile.user;
await Notification.create({
user: donorUser._id, 
type: "urgent_request", 
title: `${urgency === "critical" ?
"URGENT:" : ""}Blood needed: ${bloodType}`, 
message: `A ${urgency || "medium"}-priority request for ${unitsNeeded} unit(s) of ${bloodType} blood has been posted near ${location}. Your blood type is a match.`, relatedRequest: request._id,
});


notifyIds.push(donorUser._id);
if (donorUser. email) {
sendEmail({
to: donorUser.email, 
subject: `Blood Donation Management System: ${bloodType} blood needed near ${location}`,
text: `Hi ${donorUser.name}, a request for ${unitsNeeded} unit(s) of ${bloodType} blood has been posted near ${location}. Log in to the platform to respond if you're able to donate.`,
}).catch(() => {});
}
}
request.notifiedDonors = notifyIds;
await request.save();

return res. status (201).json({ request, donorsNotified: notifyIds.length });
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

// @route GET /api/requests/matches-for-me(donor: requests compatible with my blood type)
async function myMatches (req, res) {
const DonorProfile = require("../models/DonorProfile");

const profile = await
DonorProfile.findOne({ user: req.user._id });
if (!profile) return
res. status (404).json({ message: "Complete your donor profile first" });
const requests = await BloodRequest. find({
notifiedDonors: req.user._id, 
status: { $in: ["open", "partially_fulfilled"] },
})
.populate ("requestedBy", "name organizationName location")
.sort ({ urgency: -1, createdAt: -1 });
return res.json(requests);
}


// @route PUT /api/requests/:id/statusbody: { status }
async function updateStatus (req, res) {
const { status } = req. body;
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
module. exports = { createRequest,listRequests, myMatches, updateStatus };