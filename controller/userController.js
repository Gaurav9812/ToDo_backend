const User = require("../models/user");
const jwt = require("jsonwebtoken");
module.exports.register = async function (req, res) {
  console.log(req.body);
  try {
    let user = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phoneNum: req.body.phone,
      securityQuestion: req.body.sQuestion,
      securityAnswer: req.body.sAnswer,
    });
    console.log(user);
    res.status(200).json({
      success: true,
      message: "successfully registered",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "error field already taken",
    });
  }
};
module.exports.login = async function (req, res) {
  try {
    console.log(req.body);
    let user = await User.findOne({ username: req.body.username }).populate(
      "tasks"
    );
    if (user && user.password == req.body.password) {
      return res.json(200, {
        message: "Sign in successful,here is your token",
        success: true,
        user: user,
        token: jwt.sign(user.toJSON(), "TODO"),
      });
    } else {
      return res.json(422, {
        message: "invalid username or password",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "INTERNAL SERVER ERROR",
    });
  }
};

module.exports.getToken = async function (user) {
  let user1 = await User.findById(user._id).populate("tasks");
  let token = await jwt.sign(user1.toJSON(), "TODO");
  console.log(token);
  return token;
};
