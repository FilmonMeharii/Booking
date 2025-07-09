const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Fel vid hämtning av bokningar', error });
    }
    });

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

module.exports = router;
// This code defines the booking routes for handling GET and POST requests related to bookings.
// It uses Express.js to create a router, defines the routes, and interacts with the Booking model to fetch and save booking data.
// The GET route retrieves all bookings from the database, while the POST route creates a new booking based on the request body.
// The code also includes error handling to return appropriate status codes and messages in case of errors during database operations.
// The router is then exported for use in the main application file, allowing it to be mounted on a specific path (e.g., '/bookings') in the server setup.
// This code is part of a Node.js application that uses Express.js and Mongoose to manage bookings for an embassy.
// It is designed to handle HTTP requests related to booking appointments, including retrieving existing bookings and creating new ones.
// The code is structured to follow best practices, including using async/await for asynchronous operations and proper error handling.
// The router is intended to be used in conjunction with an Express.js application, where it can be mounted on a specific path (e.g., '/bookings') to handle booking-related requests.
