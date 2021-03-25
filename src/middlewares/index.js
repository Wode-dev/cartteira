const passport = require("passport");

module.exports = {
  anthentication: passport.authenticate("jwt"),
};
