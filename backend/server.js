const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const Admin = require("./models/Admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes and middleware
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const verifyToken = require("./middleware/auth");

app.use("/api/admin", adminRoutes);
app.use("/api/bookings", verifyToken, bookingRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("API är igång 🚀");
});

// ✅ Create admin if not exists
async function skapaAdmin() {
  try {
    const finns = await Admin.findOne({ username: "admin" });
    if (!finns) {
      const nyAdmin = new Admin({username: "admin",password: "admin123"});
      await nyAdmin.save();
      console.log("✅ Admin skapad: användarnamn = admin, lösenord = admin123");
    } else {
      console.log("🔑 Admin finns redan");
    }
  } catch (error) {
    console.error("❌ Fel vid skapande av admin:", error);
  }
}

// ✅ Connect to MongoDB and create admin
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Ansluten till MongoDB");
    return skapaAdmin(); // Run after connection
  })
  .catch((err) => {
    console.error("❌ MongoDB-anslutningsfel:", err);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌍 Server körs på http://localhost:${PORT}`);
});
