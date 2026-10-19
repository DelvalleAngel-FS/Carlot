const express = require("express");
const router = express.Router();
const {
  createManufacturers,
  updateManufacturer,
  deleteManufacturer,
  getALLManufacturers,
  getManufacturerById,
} = require("../controller/manufacturerController");

router.get("/", getALLManufacturers);

router.post("/", createManufacturers);

router.get("/:id", getManufacturerById);

router.put("/:id", updateManufacturer);

router.delete("/:id", deleteManufacturer);

module.exports = router;
