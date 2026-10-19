const mongoose = require("mongoose");

const manufacturersSchema = new mongoose.Schema({
  name: String,
  year: Number,
  location: String,
  isActive: { type: Boolean, default: true },
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

module.exports = mongoose.model("Manufacturer", manufacturersSchema);
