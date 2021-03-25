var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JWTStrategy = passportJWT.Strategy;
var params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const { User } = require("../models");

module.exports = (passport) => {
  var jwtStrategy = new JWTStrategy(params, function (payload, done) {
    User.findOne({ _id: payload.username }, function (user, err) {
      if (user) {
        return done(null, { id: user.id });
      } else {
        return done(new Error("User not found"), null);
      }
    });
  });
  passport.use(jwtStrategy);

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};
