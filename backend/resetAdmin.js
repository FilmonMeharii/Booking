const mongoose = require("mongoose");
const Admin = require("./models/Admin");
require("dotenv").config();

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Ansluten till MongoDB");

    // Ta bort befintlig admin
    await Admin.deleteOne({ username: "admin" });
    console.log("🗑️ Borttagen befintlig admin");

    // Skapa ny admin med rätt hashade lösenord
    const nyAdmin = new Admin({
      username: "admin",
      password: "admin123"
    });
    await nyAdmin.save();
    console.log("✅ Ny admin skapad: användarnamn = admin, lösenord = admin123");

    // Verifiera att lösenordet fungerar
    const admin = await Admin.findOne({ username: "admin" });
    const isMatch = await admin.comparePassword("admin123");
    console.log("🔍 Lösenordsverifiering:", isMatch ? "✅ OK" : "❌ FEL");

    await mongoose.disconnect();
    console.log("✅ Disconnected från MongoDB");
  } catch (error) {
    console.error("❌ Fel:", error);
  }
}

resetAdmin(); 