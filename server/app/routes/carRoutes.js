const express = require("express");
const router = express.Router();
const {
  createCars,
  updateCar,
  deleteCar,
  getALLCars,
  getCarById,
} = require("../controller/carController");

router.get("/", getALLCars);

router.post("/", createCars);

router.get("/:id", getCarById);

router.put("/:id", updateCar);

router.delete("/:id", deleteCar);

module.exports = router;
