const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const FriendModel = mongoose.model("friends", FriendSchema);

module.exports = FriendModel;