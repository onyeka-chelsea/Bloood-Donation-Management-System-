const User = require("../models/Usermodel");

const DonorProfile = require("../models/Donormodel");

// @route GET /api/donors/me
async function getMyProfile(req, res) {
  try {
    if (!DonorProfile) {
      return res.status(503).json({ message: "Donor profile model is not available yet" });
    }

    const profile = await DonorProfile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({ message: "Donor profile not found" });
    }

    return res.json(profile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while fetching donor profile" });
  }
}

// @route PUT /api/donors/me
async function updateMyProfile(req, res) {
  try {
    if (!DonorProfile) {
      return res.status(503).json({ message: "Donor profile model is not available yet" });
    }

    const { bloodType, dateOfBirth, weightKg, location, medicalNotes } = req.body;
    let profile = await DonorProfile.findOne({ user: req.user._id });

    if (!profile) {
      if (!bloodType || !location) {
        return res.status(400).json({ message: "bloodType and location are required" });
      }

      profile = await DonorProfile.create({
        user: req.user._id,
        bloodType,
        dateOfBirth,
        weightKg,
        location,
        medicalNotes,
      });

      return res.status(201).json(profile);
    }

    if (bloodType) profile.bloodType = bloodType;
    if (dateOfBirth) profile.dateOfBirth = dateOfBirth;
    if (weightKg) profile.weightKg = weightKg;
    if (location) profile.location = location;
    if (medicalNotes !== undefined) profile.medicalNotes = medicalNotes;

    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while updating donor profile" });
  }
}

// @route GET /api/donors (admin/hospital:list & filter donors)
async function listDonors(req, res) {
  try {
    if (!DonorProfile) {
      return res.status(503).json({ message: "Donor profile model is not available yet" });
    }

    const { bloodType, location } = req.query;
    const query = {};

    if (bloodType) query.bloodType = bloodType;
    if (location) query.location = { $regex: location, $options: "i" };

    const profiles = await DonorProfile.find(query).populate("user", "name email phone isActive");
    return res.json(profiles.filter((p) => p.user && p.user.isActive));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while listing donors" });
  }
}

// @route POST /api/donors/:id/record-donation
async function recordDonation(req, res) {
  try {
    if (!DonorProfile) {
      return res.status(503).json({ message: "Donor profile model is not available yet" });
    }

    const profile = await DonorProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Donor profile not found" });
    }

    profile.lastDonationDate = new Date();
    profile.totalDonations = (profile.totalDonations || 0) + 1;

    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while recording donation" });
  }
}

module.exports = { getMyProfile, updateMyProfile, listDonors, recordDonation };
