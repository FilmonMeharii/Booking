const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  passportNumber: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Booking', bookingSchema);
