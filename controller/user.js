const User = require("../models/user");

let UserController = {
  find: async (req, res) => {
    let found = await User.find({ name: req.params.email });
    res.json(found);
  },
  all: async (req, res) => {
    let allUser = await User.find();
    res.json(allUser);
  },
  create: async (req, res) => {
    let newUser = await new User(req.body);
    let savedUser = await newUser.save();
    res.json(savedUser);
  },
  getAllCars: async (req, res) => {
    console.log("==========>", req.params.email);
    let foundCar = await User.find({ email: req.params.email }).populate(
      "cars"
    );

    const user = await User.findById("5f47f707146cd62908009d7d");
    await user.populate("cars").execPopulate();
    console.log(user.cars);

    res.json(foundCar);
  },
};

module.exports = UserController;
