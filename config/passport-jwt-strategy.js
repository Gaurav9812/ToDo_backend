const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

// extracting token from header
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "TODO",
};
// using JWT strategy
console.log("here");
passport.use(
  new JWTStrategy(opts, function (jwtPatLoad, done) {
    console.log("hell ia m here");
    User.findById(jwtPatLoad._id, function (err, user) {
      if (err) {
        console.log("error in finding user from JWT");
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        console.log("here -2");
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
