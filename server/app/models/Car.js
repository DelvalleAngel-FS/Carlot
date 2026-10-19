const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  horsepower: Number,
  isActive: { type: Boolean, default: true },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manufacturer",
  },
});

module.exports = mongoose.model("Car", carsSchema);
