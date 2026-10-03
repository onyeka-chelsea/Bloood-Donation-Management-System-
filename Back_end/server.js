require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/InventoryRoutes");
const donorRoutes = require("./routes/donorRoutes");
const donationRoutes = require("./routes/donationRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/requests", bloodRequestRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the backend .env file");
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the backend .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Backend server running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start backend server:", error.message);
    process.exitCode = 1;
  }
}

startServer();

module.exports = app;
