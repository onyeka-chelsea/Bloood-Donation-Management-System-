const Donation = require("../models/Donation");

const DONATION_TYPES = ["Whole Blood", "Platelets", "Plasma"];

async function bookDonation(req, res) {
	const { donationType, center, date, time } = req.body;
	const appointmentDate = new Date(date);

	if (
		!DONATION_TYPES.includes(donationType) ||
		!center ||
		!date ||
		Number.isNaN(appointmentDate.getTime()) ||
		!time
	) {
		return res.status(400).json({ message: "Donation type, center, date and time are required" });
	}

	try {
		const donation = await Donation.create({
			donor: req.user._id,
			donationType,
			center,
			date: appointmentDate,
			time,
		});
		return res.status(201).json(donation);
	} catch (error) {
		console.error("Failed to book donation:", error);
		return res.status(500).json({ message: "Failed to book donation" });
	}
}

async function getDonationHistory(req, res) {
	try {
		const donations = await Donation.find({ donor: req.user._id }).sort({ date: -1 });
		return res.json(
			donations.map((donation) => ({
				id: donation._id,
				donationType: donation.donationType,
				unitId: donation.unitId || "Pending",
				donatedOn: donation.donatedOn || donation.date,
				status: donation.status,
				completedStages: donation.completedStages,
			}))
		);
	} catch (error) {
		console.error("Failed to fetch donation history:", error);
		return res.status(500).json({ message: "Failed to fetch donation history" });
	}
}

async function getAllDonations(req, res) {
	try {
		const donations = await Donation.find()
			.populate("donor", "name email")
			.sort({ date: -1 });
		return res.json(donations);
	} catch (error) {
		console.error("Failed to fetch donations:", error);
		return res.status(500).json({ message: "Failed to fetch donations" });
	}
}

async function completeDonation(req, res) {
	try {
		const donation = await Donation.findById(req.params.id);
		if (!donation) return res.status(404).json({ message: "Donation not found" });

		donation.status = "Donated";
		donation.donatedOn = new Date();
		donation.unitId = donation.unitId || `UNIT-${donation._id.toString().slice(-8)}`;
		donation.completedStages = ["Donated", "Processed", "Shared", "Follow-up"];
		await donation.save();
		return res.json(donation);
	} catch (error) {
		console.error("Failed to complete donation:", error);
		return res.status(500).json({ message: "Failed to complete donation" });
	}
}

module.exports = { bookDonation, getDonationHistory, getAllDonations, completeDonation };
