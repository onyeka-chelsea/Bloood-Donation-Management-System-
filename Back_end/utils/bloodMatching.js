const User = require("../models/User");
const
DonorProfile = require("../models/DonorProfile");
const BloodRequest = require("../models/bloodRequest");
/**
* Finds eligible donors who are blood-type compatible with the given
* recipient blood type, optionally narrowed to a location.
* Eligible = at least 90 days since their
last donation (or never donated).
*/
async function
findMatchingDonors(recipientBloodType, location) {
const compatibleTypes =
BloodRequest.compatibleDonorBloodTypes(recipientBloodType) ;
const ninetyDaysAgo = new Date(Date. now () - 90 * 24 * 60 * 60 * 1000);

const query = {
bloodType: { $in: compatibleTypes },
$or: [{ lastDonationDate: null},
{ lastDonationDate: { $lte: ninetyDaysAgo } }],
};
if (location) {
query. location = { $regex: location, $options: "i" };
}
const profiles = await
DonorProfile.find(query).populate({
path: "user",
match: { isActive: true, role: "donor" },
select: "name email phone",
});

// populate() with match filters at the DBlayer only for the populate,
// so drop profiles whose user didn'tmatch (e.g. inactive account). 
return profiles. filter((p) => p.user);
}
module. exports = { findMatchingDonors };