const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("./config/mongoose");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use(express.urlencoded());
app.use(passport.initialize());

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log(`error in setting up server`);
    return;
  }
  console.log(`server is running on port :${port}`);
});
