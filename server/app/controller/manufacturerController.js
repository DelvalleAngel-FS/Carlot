const Manufacturers = require("../models/Manufacturer");
const Car = require("../models/Car");

const getALLManufacturers = async (req, res) => {
  const reqQuery = { ...req.query };
  const removeFields = ["select", "sheet", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryString = JSON.stringify(reqQuery);

  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in|nin)\b/g,
    (match) => `$${match}`,
  );

  let query = Manufacturers.find(JSON.parse(queryString));

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  const sheet = parseInt(req.query.sheet) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const skip = (sheet - 1) * limit;

  query = query.skip(skip).limit(limit);

  const manufacturers = await query;
  res.status(200).json({
    data: manufacturers,
    success: true,
    message: `${req.method}- request to Manufacturer endpoint`,
  });
};

const getManufacturerById = async (req, res) => {
  try {
    const manufacturer = await Manufacturers.findById(req.params.id);
    res.status(200).json({
      data: manufacturer,
      success: true,
      message: `${req.method}- request to Manufacturer endpoint`,
    });
  } catch ({ message }) {
    res.status(500).json({
      success: false,
      message,
    });
  }
};

const createManufacturers = async (req, res) => {
  try {
    const { manufacturer } = req.body;
    const newManufacturer = await Manufacturers.create(manufacturer);
    console.log("data >>>", newManufacturer);
    res.status(200).json({
      data: newManufacturer,
      success: true,
      message: `${req.method}- request to Manufacturer endpoint`,
    });
  } catch ({ message }) {
    res.status(500).json({
      success: false,
      message,
    });
  }
};

const updateManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const manufacturer = await Manufacturers.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      manufacturer,
      id,
      success: true,
      message: `${req.method}- request to Manufacturer endpoint`,
    });
  } catch ({ message }) {
    res.status(500).json({
      success: false,
      message,
    });
  }
};

const deleteManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteManufacturer = await Manufacturers.findByIdAndDelete(
      id,
      req.body,
      { new: true },
    );
    res.status(200).json({
      data: deleteManufacturer,
      success: true,
      message: `${req.method}- request to Manufacturer endpoint`,
    });
  } catch ({ message }) {
    res.status(500).json({
      success: false,
      message,
    });
  }
};

module.exports = {
  createManufacturers,
  updateManufacturer,
  deleteManufacturer,
  getALLManufacturers,
  getManufacturerById,
};
