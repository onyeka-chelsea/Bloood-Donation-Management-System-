const BloodBank = require("../models/BloodBank") ;
// @route GET /api/bloodbanks
async function listBloodBanks(req, res) {
const banks = await
BloodBank. find() .populate("managedBy", "name organizationName");
return res.json(banks);
}
// @route GET /api/bloodbanks/:id
async function getBloodBank(req, res) {
const bank = await
BloodBank.findById(req.params.id).populate(" managedBy", "name organizationName"); if (!bank) return
res.status (404).json({ message: "Blood bank not found" });
return res.json(bank);
// @route POST /api/bloodbanks (admin/hospital)
async function createBloodBank(req, res) {
const { name, location, contactPhone,
LowStockThreshold } = req.body;
if (!name || !location) {
return res.status(400).json({ message:"name and location are required" });
}
const bank = await BloodBank.create({name, location, contactPhone, LowStockThreshold, managedBy: req.user._id,
}); 
return res.status (201).json(bank);
}
//body: { bloodType, units, mode: "set" |"add" }
async function updateStock(req, res) {
const { bloodType, units, mode } = req. body;
if (bloodType || units === undefined) {
 return res. status (400).json({ message:"bloodType and units are required" });
}
const bank = await
BloodBank. findById(req.params.id);
if (!bank) return
res. status (404).json({ message: "Blood bank not found" });
if (mode === "add") {
bank. adjustStock(bloodType,Number (units));
} else {
let entry = bank.stock.find((s) =>s.bloodType === bloodType);
if (!entry) {
bank.stock.push({ bloodType, units: Number(units) });

} else {
entry. units = Math. max (0,Number (units));
}
}
await bank.save()
return res.json (bank);
}
// @route GET /api/bloodbanks/:id/low-stock
async function getLowStock(req, res) {
const bank = await
BloodBank.findById(req.params.id);
if (!bank) return
res. status (404).json({ message: "Blood bank not found" });
const low = bank.stock. filter((s) => s.units <= bank.lowStockThreshold);
return res.json(low);
}
}
module. exports = { listBloodBanks,getBloodBank, createBloodBank, updateStock, getLowStock };
