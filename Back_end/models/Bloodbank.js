module.exports = require("./Bloodbank");const mongoose = require("mongoose");
const { BLOOD_TYPES } = require("./Donormodel");

const stockSchema = new mongoose.Schema(
  {
    bloodType: {
      type: String,
      enum: BLOOD_TYPES,
      required: true,
    },
    units: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);

const bloodBankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    managedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stock: {
      type: [stockSchema],
      default: () => BLOOD_TYPES.map((bloodType) => ({ bloodType, units: 0 })),
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
      min: 0,
    },
  },
  { timestamps: true }
);

bloodBankSchema.methods.getUnits = function getUnits(bloodType) {
  const entry = this.stock.find((item) => item.bloodType === bloodType);
  return entry ? entry.units : 0;
};

bloodBankSchema.methods.adjustStock = function adjustStock(bloodType, delta) {
  let entry = this.stock.find((item) => item.bloodType === bloodType);

  if (!entry) {
    entry = { bloodType, units: 0 };
    this.stock.push(entry);
  }

  entry.units = Math.max(0, entry.units + Number(delta));
  return entry.units;
};

module.exports = mongoose.model("BloodBank", bloodBankSchema);