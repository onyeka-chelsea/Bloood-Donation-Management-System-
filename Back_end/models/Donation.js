const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donationType: {
      type: String,
      enum: ["Whole Blood", "Platelets", "Plasma"],
      required: true,
    },
    center: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Booked", "Donated", "Cancelled"],
      default: "Booked",
    },
    donatedOn: {
      type: Date,
      default: null,
    },
    unitId: {
      type: String,
      default: null,
    },
    completedStages: {
      type: [String],
      enum: ["Donated", "Processed", "Shared", "Follow-up"],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);