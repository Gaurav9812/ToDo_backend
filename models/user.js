const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      maxlength: 20,
    },

    phoneNum: {
      type: Number,
      required: true,
      unique: true,
      maxlength: 11,
    },
    securityQuestion: {
      type: String,
      required: true,
      maxlength: 255,
    },
    securityAnswer: {
      type: String,
      required: true,
      maxlength: 255,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", userSchema);
module.exports = user;
