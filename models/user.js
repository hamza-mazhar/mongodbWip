const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

userSchema.virtual("cars", {
  ref: "Car",
  localField: "_id",
  foreignField: "owner",
});

module.exports = mongoose.model("User", userSchema);
