const passport = require("passport");
const jwtHelper = require("../../core/jwtHelper");
const { User } = require("../../models");

module.exports = {
  login: (req, res) => {
    console.log({ req, res });
  },
  register: async (req, res) => {
    let { username, password, fullName } = req.body;

    let createdUser = await User.create({ username, password, fullName });

    if (createdUser) {
      return res.json({ createdUser });
    }

    return res.json({ message: "It wasn't possible to register" });
  },
  renewToken: (req, res) => {},
  token: async (req, res) => {
    let { username, password } = req.body;

    let user = await User.findOne({ username });
    let valid = user.validPassword(password);

    if (valid) {
      let token = jwtHelper.createToken({ userId: user.id });
      return res.json({ token });
    }

    return res.json({ message: "It wasn't possible to authenticate" });
  },
};
