const Task = require("../models/task");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userController = require("./userController");
module.exports.createTask = async function (req, res) {
  try {
    let user = await User.findById(req.user.id).populate("tasks");
    let bool = false;
    await user.tasks.forEach((task) => {
      if (task.title == req.body.title) {
        bool = true;
        return;
      }
    });
    if (bool) {
      return res.json(500, {
        success: false,
        message: "title cannot be same",
      });
    }
    let task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      startedAt: req.body.startDate,
      finishedAt: req.body.endDate,
    });
    await req.user.tasks.push(task);
    req.user.save();

    let token = await userController.getToken(req.user);
    return res.json(200, {
      success: true,
      task: task,
      token: token,
    });
  } catch (err) {
    return res.json(500, {
      success: false,
      message: "title cannot be same",
    });
  }
};

module.exports.update = async function (req, res) {
  try {
    let id = mongoose.mongo.ObjectId(req.params.id);
    // let task = await Task.findById(req.params.id);

    let task = await Task.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          status: req.body.status,
          startedAt: req.body.startDate,
          finishedAt: req.body.endDate,
        },
      }
    );
    let token = await userController.getToken(req.user);
    if (task) {
      return res.json(200, {
        success: true,
        token: token,
      });
    }
  } catch (err) {
    return res.json(500, {
      success: false,
      message: "Unexpected error occur",
    });
  }
};
module.exports.deleteTask = async function (req, res) {
  try {
    let task = await Task.findByIdAndDelete(req.params.id);
    console.log(task);
    console.log(req.user);
    let user = await User.findByIdAndUpdate(req.user._id, {
      $pull: { tasks: req.params.id },
    }).populate("tasks");

    if (user) {
      return res.json(200, {
        success: true,
        user: user,
        token: jwt.sign(user.toJSON(), "TODO"),
      });
    }
  } catch (err) {
    return res.json(500, {
      success: false,
      message: "Unexpected error occur",
    });
  }
};
