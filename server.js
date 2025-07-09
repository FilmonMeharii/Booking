const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json()); //Middleware för att tolka JSON
const path = require("path");

// Gör så att Express serverar HTML från public-mappen
app.use(express.static(path.join(__dirname, "public")));

// 💡 Här lägger vi till routen
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes); // Prefix för boknings-API

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Ansluten till MongoDB"))
  .catch((err) => console.error("❌ MongoDB-anslutningsfel:", err));

app.get("/", (req, res) => {
  res.send("API är igång 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌍 Server körs på http://localhost:${PORT}`);
});
