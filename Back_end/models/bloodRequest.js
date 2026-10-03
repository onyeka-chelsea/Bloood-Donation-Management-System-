const mongoose = require("mongoose");
const { BLOOD_TYPES } = require("./Donormodel");

const bloodRequestSchema = new mongoose.Schema(
  {
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bloodBank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BloodBank",
    },
    bloodType: {
      type: String,
      enum: BLOOD_TYPES,
      required: true,
    },
    unitsNeeded: {
      type: Number,
      required: true,
      min: 1,
    },
    urgency: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    patientInfo: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["open", "partially_fulfilled", "fulfilled", "cancelled"],
      default: "open",
    },
    notifiedDonors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const DONOR_COMPATIBILITY = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"],
};

bloodRequestSchema.statics.compatibleDonorBloodTypes = function compatibleDonorBloodTypes(
  recipientBloodType
) {
  return Object.entries(DONOR_COMPATIBILITY)
    .filter(([, recipientTypes]) => recipientTypes.includes(recipientBloodType))
    .map(([donorType]) => donorType);
};

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
module.exports.DONOR_COMPATIBILITY = DONOR_COMPATIBILITY;
