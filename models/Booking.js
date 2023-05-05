const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "PlaceModel",
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  maxGuests: { type: Number, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  totalPrice: { type: Number, required: true },
});

const bookingModel = mongoose.model("BookingModel", bookingSchema);

module.exports = bookingModel;
