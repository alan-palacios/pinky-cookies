var mongoose = require("mongoose");

module.exports = mongoose.model(
  "recipesGroups",
  new mongoose.Schema({
    groupName: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      min: 0,
      max: 2,
      required: true
    },
    public: {
      type: Boolean,
      required: true,
    },
    creator: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      picture: {
        type: String,
        required: true,
      },
    },
    picture: {
      type: String,
      required: true
    },
    recipes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'recipes'}]
  })
);
