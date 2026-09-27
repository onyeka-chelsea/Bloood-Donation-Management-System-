const mongoose = require("mongoose");

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const donorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bloodType: {
      type: String,
      enum: BLOOD_TYPES,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    weightKg: {
      type: Number,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    lastDonationDate: {
      type: Date,
      default: null,
    },
    medicalNotes: {
      type: String,
      trim: true,
    },
    totalDonations: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

donorProfileSchema.virtual("isEligible").get(function isEligible() {
  if (!this.lastDonationDate) {
    return true;
  }

  const daysSince =
    (Date.now() - this.lastDonationDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysSince >= 90;
});

donorProfileSchema.virtual("nextEligibleDate").get(function nextEligibleDate() {
  if (!this.lastDonationDate) {
    return null;
  }

  const next = new Date(this.lastDonationDate);
  next.setDate(next.getDate() + 90);
  return next;
});

donorProfileSchema.set("toJSON", { virtuals: true });
donorProfileSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("DonorProfile", donorProfileSchema);
module.exports.BLOOD_TYPES = BLOOD_TYPES;