const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username});

    if (!admin) return res.status(404).json({ message: 'Användare hittades inte' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Felaktigt lösenord' });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, admin: { id: admin._id, username: admin.username } });
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const newAdmin = new (require("../models/Admin"))({ username, password });
    await newAdmin.save();
    res.status(201).json({ message: "Admin skapad!" });
  } catch (err) {
    res.status(500).json({ message: "Fel vid skapande", error: err });
  }
});


module.exports = router;