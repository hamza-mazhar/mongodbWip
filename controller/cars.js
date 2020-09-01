const Car = require("../models/cars");

let CarController = {
  find: async (req, res) => {
    let found = await Car.find({ name: req.params.email });
    res.json(found);
  },
  all: async (req, res) => {
    let allCar = await Car.find();
    res.json(allCar);
  },
  create: async (req, res) => {
    let newCar = await new Car(req.body);
    let savedCar = await newCar.save();
    res.json(savedCar);
  },
  getAllCars: async (req, res) => {
    let foundCar = await User.Car({ name: req.params.model });
    res.json(foundCar);
  },
};

module.exports = CarController;
