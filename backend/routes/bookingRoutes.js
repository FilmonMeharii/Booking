const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const verifyToken = require("../middleware/auth");



// Hämta alla bokningar
router.get("/", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Fel vid hämtning av bokningar", error });
  }
});


// Skapa ny bokning
router.post('/', async (req, res) => {
  const { name, passportNumber, appointmentDate } = req.body;
  const newBooking = new Booking({
    name,
    passportNumber,
    appointmentDate
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Fel vid skapande av bokning', error });
  }
});

// Radera bokning via ID
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Bokning raderad' });
  } catch (error) {
    res.status(500).json({ message: 'Fel vid radering', error });
  }
});

module.exports = router;
