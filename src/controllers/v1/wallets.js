let { Wallet } = require("../../models");

module.exports = {
  index: (req, res) => {},
  view: (req, res) => {},
  create: (req, res) => {},
  update: (req, res) => {},
  delete: (req, res) => {},
  entries: require("./walletEntries"),
};
