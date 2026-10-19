const Car = require("../models/Car");
const Manufacturer = require("../models/Manufacturer");

const getALLCars = async (req, res) => {
  //Create a copy of query object to isolate filters
  const reqQuery = JSON.parse(JSON.stringify(req.query));
  //Fields to exclude from the core matching filters
  const removeFields = ["select", "sort", "sheet", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);
  //2. Converting filters to json and inject mongoose operators
  let queryString = JSON.stringify(reqQuery);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in|nin)\b/g,
    (match) => `$${match}`,
  );
  let query = Car.find(JSON.parse(queryString));

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  //Handling Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  }
  //Handling Pagination
  const sheet = parseInt(req.query.sheet) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const skip = (sheet - 1) * limit;

  query = query.skip(skip).limit(limit);
  const car = await query;
  res.status(200).json({
    data: car,
    success: true,
    message: `${req.method}- request to Car endpoint`,
  });
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json({
      data: car,
      success: true,
      message: `${req.method}- request to Car endpoint`,
    });
  } catch ({ nessage }) {
    res.status(500).json({
      success: false,
      message,
    });
  }
};

const createCars = async (req, res) => {
  try {
    const { car } = req.body;
    const user = await Manufacturer.findById(car.manufacturer);
    car.manufacturer = user;
    const carData = new Car(car);
    user.cars.push(carData._id);
    //saves the car and user data
    const queries = [carData.save(), user.save()];
    await Promise.all(queries);
    // console.log("data >>>", newCar);
    res.status(200).json({
      data: carData,
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

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      data: car,
      success: true,
      message: `${req.method}- request to Car endpoint`,
    });
  } catch ({ message }) {
    res.status(500).json({
      success: false,
      message,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCar = await Car.findByIdAndDelete(id, req.body, { new: true });
    res.status(200).json({
      data: deleteCar,
      success: true,
      message: `${req.method}- request to Car endpoint`,
    });
  } catch ({ message }) {
    res.status(500).json({
      success: false,
      message,
    });
  }
};

module.exports = {
  createCars,
  updateCar,
  deleteCar,
  getALLCars,
  getCarById,
};
