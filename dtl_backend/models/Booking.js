const mongoose = require("mongoose");

const Booking = mongoose.model("Booking", {
  date: { type: String },
  slots: {
    1000: {
      name: { type: String, default: "" },
      isAvailable: { type: Boolean }
    },
    1030: {
      name: { type: String, default: "" },
      isAvailable: { type: Boolean }
    },
    1100: {
      name: { type: String, default: "" },
      isAvailable: { type: Boolean }
    },
    1130: {
      name: { type: String, default: "" },
      isAvailable: { type: Boolean }
    },
    1400: {
      name: { type: String, default: "" },
      isAvailable: { type: Boolean }
    },
    1430: {
      name: { type: String, default: "" },
      isAvailable: { type: Boolean }
    },
    1500: {
      name: { type: String, default: "" },
      isAvailable: { type: Boolean }
    },
    1530: {
      name: { type: String, default: "" },
      isAvailable: { type: Boolean }
    },
    1600: {
      name: { type: String, default: "" },
      isAvailable: { type: Boolean }
    },
    1630: {
      name: { type: String, default: "" },
      isAvailable: { type: Boolean }
    },
    1700: {
      name: { type: String, default: "" },
      isAvailable: { type: Boolean }
    },
    1730: {
      name: { type: String, default: "" },
      isAvailable: { type: Boolean }
    }
  }
});

module.exports = Booking;
