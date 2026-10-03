const BloodBank = require("../models/Bloodbank");
const { BLOOD_TYPES } = require("../models/Donormodel");

async function getInventory(req, res) {
  try {
    const query = req.user.role === "bloodbank" ? { managedBy: req.user._id } : {};
    const bloodBanks = await BloodBank.find(query).sort({ name: 1 });
    const items = bloodBanks.flatMap((bank) =>
      bank.stock.map((stock) => ({
        id: `${bank._id}:${stock.bloodType}`,
        bloodType: stock.bloodType,
        units: stock.units,
        updatedAt: bank.updatedAt,
      }))
    );
    return res.json(items);
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
    return res.status(500).json({ message: "Failed to fetch inventory" });
  }
}

async function updateInventory(req, res) {
  const [bankId, bloodType] = req.params.id.split(":");
  const units = req.body.units;
  if (!bankId || !BLOOD_TYPES.includes(bloodType) || !Number.isInteger(units) || units < 0) {
    return res.status(400).json({ message: "Valid blood type and whole-number units are required" });
  }

  try {
    const query = { _id: bankId };
    if (req.user.role === "bloodbank") query.managedBy = req.user._id;
    const bank = await BloodBank.findOne(query);
    if (!bank) return res.status(404).json({ message: "Blood bank not found" });

    const stock = bank.stock.find((item) => item.bloodType === bloodType);
    if (stock) stock.units = units;
    else bank.stock.push({ bloodType, units });
    await bank.save();

    return res.json({
      id: `${bank._id}:${bloodType}`,
      bloodType,
      units,
      updatedAt: bank.updatedAt,
    });
  } catch (error) {
    console.error("Failed to update inventory:", error);
    return res.status(500).json({ message: "Failed to update inventory" });
  }
}

module.exports = { getInventory, updateInventory };