const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,

      maxlength: 500,
    },
    status: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: Date,
      default: new Date(),
    },
    finishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
