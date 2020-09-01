const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Event = require("../models/events");

const events = async (eventId) => {
  try {
    const events = Event.find({ _id: { $in: eventId } });
    return await events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator),
      };
    });
  } catch (err) {
    throw err;
  }
};
const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvent: events.bind(this, user._doc.createdEvent),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          creator: user.bind(this, event._doc.creator),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args) => {
    try {
      const event = new Event({
        title: args.eventInput.title,
        price: args.eventInput.price,
        description: args.eventInput.description,
        date: new Date(args.eventInput.date),
      });
      let createdEvent;
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator),
      };
      const user = await User.findById("asdfaweafs");
      if (!user) {
        throw new Error("User not found");
      }
      user.createdEvent.push(event);
      await user.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
  createUser: async (args) => {
    try {
      const existinguser = await User.findOne({ email: args.userInput.email });
      if (existinguser) {
        throw new Error("User already exists");
      }
      const hashpassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashpassword,
      });
      const result = await user.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
};
