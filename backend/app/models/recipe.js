var mongoose = require("mongoose");

module.exports = mongoose.model(
  "recipes",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    prepTime: {
      type: Number,
      min: 0,
    },
    calories: {
      type: Number,
      min: 0,
    },
    yield: {
      type: Number,
      required: true,
      min: 0,
    },
    presentation: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
    },
    creator: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      picture: {
        type: String,
        required: true,
      },
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    picture: {
      type: String,
    },
    steps: [
      {
        description: {
          type: String,
          required: true,
        },
        picture: {
          type: String,
        },
      },
    ],
    ingredients: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        presentation: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
  })
);
