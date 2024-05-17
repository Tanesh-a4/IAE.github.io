const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  bookingTimeSlot: String,
  resName: String,
  numTablesBooked: Number,
  orderId: String,
  userId: String,
  is_served: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;